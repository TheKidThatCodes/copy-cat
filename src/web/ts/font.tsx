import { Styles } from "cc-web-term";
import { VNode, h } from "preact";

const mk = (child: VNode<any>) => {
  const node = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class={Styles.icon_font}>
    {child}
  </svg>;
  return () => node;
};

export const Cog = mk(<path d="M571 650q0 -59 -41 -101t-101 -42 -101 42 -42 101 42 101 101 42 101 -42 41 -101zm286 -61v124q0 7 -4 13t-11 7l-104 16q-10 30 -21 51 19 27 59 77 6 6 6 13t-5 13q-15 21 -55 61t-53 39q-7 0 -14 -5l-77 -60q-25 13 -51 21 -9 76 -16 104 -4 16 -20 16h-124q-8 0 -14 -5t-6 -12l-16 -103q-27 -9 -50 -21l-79 60q-6 5 -14 5 -8 0 -14 -6 -70 -64 -92 -94 -4 -5 -4 -13 0 -6 5 -12 8 -12 28 -37t30 -40q-15 -28 -23 -55l-102 -15q-7 -1 -11 -7t-5 -13v-124q0 -7 5 -13t10 -7l104 -16q8 -25 22 -51 -23 -32 -60 -77 -6 -7 -6 -14 0 -5 5 -12 15 -20 55 -60t53 -40q7 0 15 5l77 60q24 -13 50 -21 9 -76 17 -104 3 -16 20 -16h124q7 0 13 5t7 12l15 103q28 9 51 20l79 -59q5 -5 13 -5 7 0 14 5 72 67 92 95 4 5 4 12 0 7 -4 13 -9 12 -29 37t-30 40q15 28 23 54l102 16q7 1 12 7t4 13z" />);
export const Info = mk(<path d="M571 918v-89q0 -8 -5 -13t-12 -5h-54v-286q0 -8 -5 -13t-13 -5h-178q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h53v179h-53q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h250q7 0 12 -5t5 -13zm-71 -500v-89q0 -8 -5 -13t-13 -5h-107q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h107q8 0 13 -5t5 -13zm357 232q0 117 -57 215t-156 156 -215 58 -216 -58 -155 -156 -58 -215 58 -215 155 -156 216 -58 215 58 156 156 57 215z" />);
export const Download = mk(<path d="M714 900q0 -15 -10 -25t-25 -11 -25 11 -11 25 11 25 25 11 25 -11 10 -25zm143 0q0 -15 -10 -25t-26 -11 -25 11 -10 25 10 25 25 11 26 -11 10 -25zm72 -125v179q0 22 -16 37t-38 16h-821q-23 0 -38 -16t-16 -37v-179q0 -22 16 -38t38 -16h259l75 76q33 32 76 32t76 -32l76 -76h259q22 0 38 16t16 38zm-182 -318q10 23 -8 39l-250 250q-10 11 -25 11t-25 -11l-250 -250q-17 -16 -8 -39 10 -21 33 -21h143v-250q0 -15 11 -25t25 -11h143q14 0 25 11t10 25v250h143q24 0 33 21z" />);

export const Lua = mk(<path d="M882 650c0 -211 -171 -382 -382 -382s-382 171 -382 382c0 211 171 382 382 382s382 -171 382 -382m-112 -158c0 -62 -50 -112 -112 -112s-111 50 -111 112c0 61 50 112 111 112s112 -51 112 -112m224 -224c0 -62 -50 -112 -112 -112s-112 50 -112 112c0 61 51 112 112 112s112 -50 112 -112" fill="#000080" />);
export const Text = mk(<path d="M819 362q16 16 27 42t11 50v642q0 23 -15 38t-38 16h-750q-23 0 -38 -16t-16 -38v-892q0 -23 16 -38t38 -16h500q22 0 49 11t42 27zm-248 -136v210h210q-5 -17 -12 -23l-175 -175q-6 -7 -23 -12zm215 853v-572h-232q-23 0 -38 -16t-16 -37v-233h-429v858h715zm-572 -483q0 -7 5 -12t13 -5h393q8 0 13 5t5 12v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36zm411 125q8 0 13 5t5 13v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36q0 -8 5 -13t13 -5h393zm0 143q8 0 13 5t5 13v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36q0 -8 5 -13t13 -5h393z" />);

export const RightOpen = mk(<path d="M618 639l-414 415q-11 10 -25 10t-25 -10l-93 -93q-11 -11 -11 -25t11 -25l296 -297 -296 -296q-11 -11 -11 -25t11 -25l93 -93q10 -11 25 -11t25 11l414 414q10 11 10 25t-10 25z" />);
export const DownOpen = mk(<path d="M939 601l-414 413q-10 11 -25 11t-25 -11l-414 -413q-11 -11 -11 -26t11 -25l93 -92q10 -11 25 -11t25 11l296 296 296 -296q11 -11 25 -11t26 11l92 92q11 11 11 25t-11 26z" />);
