package cc.tweaked.web;

import cc.tweaked.web.js.ComputerAccess;
import cc.tweaked.web.js.ComputerCallbacks;
import cc.tweaked.web.js.JsonParse;
import cc.tweaked.web.mount.ComputerAccessMount;
import cc.tweaked.web.peripheral.SpeakerPeripheral;
import cc.tweaked.web.peripheral.TickablePeripheral;
import cc.tweaked.web.stub.Logger;
import cc.tweaked.web.stub.LoggerFactory;
import dan200.computercraft.api.filesystem.WritableMount;
import dan200.computercraft.api.peripheral.IPeripheral;
import dan200.computercraft.core.ComputerContext;
import dan200.computercraft.core.computer.Computer;
import dan200.computercraft.core.computer.ComputerEnvironment;
import dan200.computercraft.core.computer.ComputerSide;
import dan200.computercraft.core.metrics.Metric;
import dan200.computercraft.core.metrics.MetricsObserver;
import dan200.computercraft.core.terminal.Palette;
import dan200.computercraft.core.terminal.Terminal;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ComputerWrapper implements ComputerEnvironment, ComputerCallbacks, MetricsObserver {
    private static final Logger LOG = LoggerFactory.getLogger(ComputerWrapper.class);

    private static final ComputerSide[] SIDES = ComputerSide.values();
    private boolean terminalChanged = false;
    private final Terminal terminal = new Terminal(Main.computerTermWidth, Main.computerTermHeight, true, () -> terminalChanged = true);
    private final Computer computer;
    private final ComputerAccess computerAccess;
    private boolean disposed = false;
    private boolean customSize;

    public ComputerWrapper(ComputerContext context, ComputerAccess computerAccess) {
        this.computerAccess = computerAccess;
        this.computer = new Computer(context, this, terminal, 0);

        if (!disposed) computer.turnOn();
    }

    /**
     * Tick this computer.
     *
     * @return If this computer has been disposed of.
     */
    public boolean tick() {
        if (disposed && computer.isOn()) computer.unload();

        try {
            computer.tick();
        } catch (RuntimeException e) {
            LOG.error("Error when ticking computer", e);
        }

        if (computer.pollAndResetChanged()) {
            computerAccess.setState(computer.getLabel(), computer.isOn());
        }

        if (!customSize && (terminal.getWidth() != Main.computerTermWidth || terminal.getHeight() != Main.computerTermHeight)) {
            terminal.resize(Main.computerTermWidth, Main.computerTermHeight);
            computer.queueEvent("term_resize", null);
        }

        for (ComputerSide side : SIDES) {
            IPeripheral peripheral = computer.getEnvironment().getPeripheral(side);
            if (peripheral instanceof TickablePeripheral toTick) toTick.tick();
        }

        if (terminalChanged) {
            terminalChanged = false;
            computerAccess.updateTerminal(
                terminal.getWidth(), terminal.getHeight(),
                terminal.getCursorX(), terminal.getCursorY(),
                terminal.getCursorBlink(), terminal.getTextColour()
            );

            for (int i = 0; i < terminal.getHeight(); i++) {
                computerAccess.setTerminalLine(i,
                    terminal.getLine(i).toString(),
                    terminal.getTextColourLine(i).toString(),
                    terminal.getBackgroundColourLine(i).toString()
                );
            }

            Palette palette = terminal.getPalette();
            for (int i = 0; i < 16; i++) {
                double[] colours = palette.getColour(i);
                computerAccess.setPaletteColour(15 - i, colours[0], colours[1], colours[2]);
            }

            computerAccess.flushTerminal();
        }

        return disposed && !computer.isOn();
    }

    @Override
    public int getDay() {
        return (int) ((Main.getTicks() + 6000) / 24000) + 1;
    }

    @Override
    public double getTimeOfDay() {
        return ((Main.getTicks() + 6000) % 24000) / 1000.0;
    }

    @org.jetbrains.annotations.Nullable
    @Override
    public WritableMount createRootMount() {
        return new ComputerAccessMount(computerAccess);
    }

    @Override
    public MetricsObserver getMetrics() {
        return this;
    }

    @Override
    public void observe(Metric.Counter counter) {
    }

    @Override
    public void observe(Metric.Event event, long value) {
    }

    @Override
    public void setLabel(@Nullable String label) {
        computer.setLabel(label);
    }

    @Override
    public void event(@Nonnull String event, String[] args) {
        computer.queueEvent(event, JsonParse.parseValues(args));
    }

    @Override
    public void shutdown() {
        computer.shutdown();
    }

    @Override
    public void turnOn() {
        computer.turnOn();
    }

    @Override
    public void reboot() {
        computer.reboot();
    }

    @Override
    public void dispose() {
        disposed = true;
    }

    @Override
    public void resize(int width, int height) {
        customSize = true;
        if (terminal.getWidth() != width || terminal.getHeight() != height) {
            terminal.resize(width, height);
            computer.queueEvent("term_resize", null);
        }
    }

    @Override
    public void setPeripheral(@Nonnull String sideName, @Nullable String kind) {
        ComputerSide side = ComputerSide.valueOfInsensitive(sideName);
        IPeripheral peripheral;
        if (kind == null) {
            peripheral = null;
        } else if (kind.equals("speaker")) {
            peripheral = new SpeakerPeripheral();
        } else {
            throw new IllegalStateException("Unknown peripheral kind");
        }

        computer.getEnvironment().setPeripheral(side, peripheral);
    }
}
