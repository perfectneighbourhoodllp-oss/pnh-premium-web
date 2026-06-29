/* Blog index — assembles every post (one file per project under lib/posts/). */
import type { BlogPost } from './blog-types';
export type { BlogPost, Block, FAQ } from './blog-types';
export { BLOG_AUTHOR } from './blog-types';

import { post as prestigeGolfshire } from './posts/prestige-golfshire';
import { post as embassyBoulevard } from './posts/embassy-boulevard';
import { post as embassyLakeTerraces } from './posts/embassy-lake-terraces';
import { post as embassySpringsTheGrove } from './posts/embassy-springs-the-grove';
import { post as godrejReserve } from './posts/godrej-reserve';
import { post as prestigeDewDrops } from './posts/prestige-dew-drops';
import { post as brigadeOrchardsSignature } from './posts/brigade-orchards-signature';
import { post as bhartiyaCityLeela } from './posts/bhartiya-city-leela';
import { post as prestigeWhiteMeadows } from './posts/prestige-white-meadows';
import { post as totalEnvironmentRhapsody } from './posts/total-environment-rhapsody';
import { post as embassyGrove } from './posts/embassy-grove';
import { post as nambiarBellesa } from './posts/nambiar-bellesa';
import { post as tataPromont } from './posts/tata-promont';
import { post as prestigeKingfisherTowers } from './posts/prestige-kingfisher-towers';
import { post as phoenixKessaku } from './posts/phoenix-kessaku';
import { post as phoenixOneWest } from './posts/phoenix-one-west';
import { post as sobhaInternationalCity } from './posts/sobha-international-city';
import { post as prestigeLeelaResidences } from './posts/prestige-leela-residences';
import { post as embassyOneFourSeasons } from './posts/embassy-one-four-seasons';

export const POSTS: BlogPost[] = [
  prestigeGolfshire,
  embassyBoulevard,
  embassyLakeTerraces,
  embassySpringsTheGrove,
  godrejReserve,
  prestigeDewDrops,
  brigadeOrchardsSignature,
  bhartiyaCityLeela,
  prestigeWhiteMeadows,
  totalEnvironmentRhapsody,
  embassyGrove,
  nambiarBellesa,
  tataPromont,
  prestigeKingfisherTowers,
  phoenixKessaku,
  phoenixOneWest,
  sobhaInternationalCity,
  prestigeLeelaResidences,
  embassyOneFourSeasons,
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
