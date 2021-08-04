import { Class, Subclass } from "~/composables/Characters";
import { build as build_2001_1_wood_act } from "./2001_1_wood_act"
import { build as build_2001_2_Alchemy_Choppin_hybrid } from "./2001_2_Alchemy_Choppin_hybrid"
import { build as build_2001_3_Worship_Choppin_hybrid } from "./2001_3_Worship_Choppin_hybrid"
import { build as build_2001_catch_act } from "./2001_catch_act"
import { build as build_2002_catch_act } from "./2002_catch_act"
import { build as build_2002_catching_100 } from "./2002_catching_100"
import { build as build_2003_1_min_act } from "./2003_1_min_act"
import { build as build_2003_2_min_act_w3 } from "./2003_2_min_act_w3"
import { build as build_2003_3_Mining_con_hybrid } from "./2003_3_Mining_con_hybrid"
import { build as build_2003_4_fish_act } from "./2003_4_fish_act"
import { build as build_2003_5_fish_act_w3 } from "./2003_5_fish_act_w3"
import { build as build_2003_min_act } from "./2003_min_act"
import { build as build_2004_min_act_w3 } from "./2004_min_act_w3"
import { build as build_2005_Mining_con_hybrid } from "./2005_Mining_con_hybrid"
import { build as build_2006_wood_act } from "./2006_wood_act"
import { build as build_3001_journeyman_afk_40 } from "./3001_journeyman_afk_40"
import { build as build_3002_journeyman_afk_55 } from "./3002_journeyman_afk_55"
import { build as build_3004_journeyman_afk_70 } from "./3004_journeyman_afk_70"
import { build as build_3005_maestro_skill_100 } from "./3005_maestro_skill_100"
import { build as build_4001_warrior_act_35 } from "./4001_warrior_act_35"
import { build as build_4001_warrior_afk_35 } from "./4001_warrior_afk_35"
import { build as build_4103_barb_act_50 } from "./4103_barb_act_50"
import { build as build_4103_barb_act_70 } from "./4103_barb_act_70"
import { build as build_4103_barb_act_85 } from "./4103_barb_act_85"
import { build as build_4103_barb_act_85_zow } from "./4103_barb_act_85_zow"
import { build as build_4104_barb_act_100 } from "./4104_barb_act_100"
import { build as build_4105_barb_afk_50 } from "./4105_barb_afk_50"
import { build as build_4105_barb_afk_70 } from "./4105_barb_afk_70"
import { build as build_4201_sqr_act_50 } from "./4201_sqr_act_50"
import { build as build_4201_sqr_act_70 } from "./4201_sqr_act_70"
import { build as build_4202_squ_afk_50 } from "./4202_squ_afk_50"
import { build as build_4202_squ_afk_70 } from "./4202_squ_afk_70"
import { build as build_5001_arc_act_35 } from "./5001_arc_act_35"
import { build as build_5002_arc_afk_35 } from "./5002_arc_afk_35"
import { build as build_5102_bow_act_50 } from "./5102_bow_act_50"
import { build as build_5102_bow_act_70 } from "./5102_bow_act_70"
import { build as build_5102_bow_act_90 } from "./5102_bow_act_90"
import { build as build_5102_bow_afk_50 } from "./5102_bow_afk_50"
import { build as build_5103_bow_afk_70 } from "./5103_bow_afk_70"
import { build as build_5103_bow_afk_90 } from "./5103_bow_afk_90"
import { build as build_5106_bow_boss_100 } from "./5106_bow_boss_100"
import { build as build_5201_hun_act_50 } from "./5201_hun_act_50"
import { build as build_5201_hun_act_70 } from "./5201_hun_act_70"
import { build as build_5201_hun_act_90 } from "./5201_hun_act_90"
import { build as build_5202_hun_afk_50 } from "./5202_hun_afk_50"
import { build as build_5202_hun_afk_70 } from "./5202_hun_afk_70"
import { build as build_5202_hun_afk_90 } from "./5202_hun_afk_90"
import { build as build_6001_mage_act_35 } from "./6001_mage_act_35"
import { build as build_6001_mage_afk_35 } from "./6001_mage_afk_35"
import { build as build_6101_sham_afk_50 } from "./6101_sham_afk_50"
import { build as build_6103_sha_act_50 } from "./6103_sha_act_50"
import { build as build_6103_sha_act_70 } from "./6103_sha_act_70"
import { build as build_6103_sha_act_90_camarok } from "./6103_sha_act_90_camarok"
import { build as build_6103_sham_afk_70 } from "./6103_sham_afk_70"
import { build as build_6105_sham_afk_50 } from "./6105_sham_afk_50"
import { build as build_6105_sham_afk_70 } from "./6105_sham_afk_70"
import { build as build_6105_sham_afk_90 } from "./6105_sham_afk_90"
import { build as build_6201_wiz_act_50 } from "./6201_wiz_act_50"
import { build as build_6201_wiz_act_70 } from "./6201_wiz_act_70"
import { build as build_6202_wiz_afk_50 } from "./6202_wiz_afk_50"
import { build as build_6202_wiz_afk_70 } from "./6202_wiz_afk_70"
import { build as build_6202_wiz_afk_90 } from "./6202_wiz_afk_90"
import { build as build_Alchemy_Choppin_hybrid } from "./Alchemy_Choppin_hybrid"
import { build as build_Rams_hunter_active_150 } from "./Rams_hunter_active_150"
import { build as build_Worship_Choppin_hybrid } from "./Worship_Choppin_hybrid"



export type BuildTab = {
    skills: Record<number, string>; // Skill index -> points
    comment: string;
};
export type Build = {
    title: string; // Build name
    version: string; // Version of Idleon for the build
    class: Class;
    subclass?: Subclass;
    tabs: BuildTab[];
    notes: string;
};

export const builds: Build[] = [];
builds.push(build_2001_1_wood_act);
builds.push(build_2001_2_Alchemy_Choppin_hybrid);
builds.push(build_2001_3_Worship_Choppin_hybrid);
builds.push(build_2001_catch_act);
builds.push(build_2002_catch_act);
builds.push(build_2002_catching_100);
builds.push(build_2003_1_min_act);
builds.push(build_2003_2_min_act_w3);
builds.push(build_2003_3_Mining_con_hybrid);
builds.push(build_2003_4_fish_act);
builds.push(build_2003_5_fish_act_w3);
builds.push(build_2003_min_act);
builds.push(build_2004_min_act_w3);
builds.push(build_2005_Mining_con_hybrid);
builds.push(build_2006_wood_act);
builds.push(build_3001_journeyman_afk_40);
builds.push(build_3002_journeyman_afk_55);
builds.push(build_3004_journeyman_afk_70);
builds.push(build_3005_maestro_skill_100);
builds.push(build_4001_warrior_act_35);
builds.push(build_4001_warrior_afk_35);
builds.push(build_4103_barb_act_50);
builds.push(build_4103_barb_act_70);
builds.push(build_4103_barb_act_85);
builds.push(build_4103_barb_act_85_zow);
builds.push(build_4104_barb_act_100);
builds.push(build_4105_barb_afk_50);
builds.push(build_4105_barb_afk_70);
builds.push(build_4201_sqr_act_50);
builds.push(build_4201_sqr_act_70);
builds.push(build_4202_squ_afk_50);
builds.push(build_4202_squ_afk_70);
builds.push(build_5001_arc_act_35);
builds.push(build_5002_arc_afk_35);
builds.push(build_5102_bow_act_50);
builds.push(build_5102_bow_act_70);
builds.push(build_5102_bow_act_90);
builds.push(build_5102_bow_afk_50);
builds.push(build_5103_bow_afk_70);
builds.push(build_5103_bow_afk_90);
builds.push(build_5106_bow_boss_100);
builds.push(build_5201_hun_act_50);
builds.push(build_5201_hun_act_70);
builds.push(build_5201_hun_act_90);
builds.push(build_5202_hun_afk_50);
builds.push(build_5202_hun_afk_70);
builds.push(build_5202_hun_afk_90);
builds.push(build_6001_mage_act_35);
builds.push(build_6001_mage_afk_35);
builds.push(build_6101_sham_afk_50);
builds.push(build_6103_sha_act_50);
builds.push(build_6103_sha_act_70);
builds.push(build_6103_sha_act_90_camarok);
builds.push(build_6103_sham_afk_70);
builds.push(build_6105_sham_afk_50);
builds.push(build_6105_sham_afk_70);
builds.push(build_6105_sham_afk_90);
builds.push(build_6201_wiz_act_50);
builds.push(build_6201_wiz_act_70);
builds.push(build_6202_wiz_afk_50);
builds.push(build_6202_wiz_afk_70);
builds.push(build_6202_wiz_afk_90);
builds.push(build_Alchemy_Choppin_hybrid);
builds.push(build_Rams_hunter_active_150);
builds.push(build_Worship_Choppin_hybrid);
