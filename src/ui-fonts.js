/* Interface font choices (v1.3.1). Ten options, every one covering Latin and
   Bangla including Bengali digits. "system" is the default and is exactly the
   v1.3.0 look (Segoe UI Variable / Segoe UI + Nirmala UI). The other nine are
   bundled WOFF2 subsets (SIL OFL, see src/fonts/ui/); the app never loads
   remote fonts. The Alhamdulillah reward keeps its own Aref Ruqaa face. */

export const SYSTEM_STACK = '"Segoe UI Variable", "Segoe UI", "Nirmala UI", "Amiri", system-ui, sans-serif';
export const DEFAULT_UI_FONT = 'system';

export const UI_FONTS = Object.freeze([
  { id: 'system',   family: null,                 en: 'System default (Segoe UI)', bn: 'সিস্টেম ডিফল্ট (Segoe UI)' },
  { id: 'hind',     family: 'Hind Siliguri',      en: 'Hind Siliguri · clean sans', bn: 'Hind Siliguri · পরিচ্ছন্ন সানস' },
  { id: 'notosans', family: 'Noto Sans Bengali',  en: 'Noto Sans Bengali · neutral', bn: 'Noto Sans Bengali · নিরপেক্ষ' },
  { id: 'notoserif', family: 'Noto Serif Bengali', en: 'Noto Serif Bengali · book serif', bn: 'Noto Serif Bengali · সেরিফ' },
  { id: 'anek',     family: 'Anek Bangla',        en: 'Anek Bangla · modern', bn: 'Anek Bangla · আধুনিক' },
  { id: 'baloo',    family: 'Baloo Da 2',         en: 'Baloo Da 2 · rounded', bn: 'Baloo Da 2 · গোলাকার' },
  { id: 'tiro',     family: 'Tiro Bangla',        en: 'Tiro Bangla · editorial serif', bn: 'Tiro Bangla · সম্পাদকীয় সেরিফ' },
  { id: 'atma',     family: 'Atma',               en: 'Atma · friendly display', bn: 'Atma · বন্ধুসুলভ' },
  { id: 'mina',     family: 'Mina',               en: 'Mina · soft humanist', bn: 'Mina · কোমল' },
  { id: 'galada',   family: 'Galada',             en: 'Galada · script', bn: 'Galada · হস্তলিপি' },
  { id: 'cabin', family: 'Cabin', en: 'Cabin', bn: 'Cabin · নতুন' },
  { id: 'cantarell', family: 'Cantarell', en: 'Cantarell', bn: 'Cantarell · নতুন' },
  { id: 'lato', family: 'Lato', en: 'Lato', bn: 'Lato · নতুন' },
  { id: 'carlito', family: 'Carlito', en: 'Carlito', bn: 'Carlito · নতুন' },
  { id: 'cousine', family: 'Cousine', en: 'Cousine', bn: 'Cousine · নতুন' },
  { id: 'arimo', family: 'Arimo', en: 'Arimo', bn: 'Arimo · নতুন' },
  { id: 'andika', family: 'Andika', en: 'Andika', bn: 'Andika · নতুন' },
  { id: 'comfortaa', family: 'Comfortaa', en: 'Comfortaa', bn: 'Comfortaa · নতুন' },
  { id: 'clearsans', family: 'Clear Sans', en: 'Clear Sans', bn: 'Clear Sans · নতুন' },
  { id: 'lohit', family: 'Lohit Bengali', en: 'Lohit Bengali', bn: 'Lohit Bengali · নতুন' },
  { id: 'notoui', family: 'Noto Bengali UI', en: 'Noto Bengali UI', bn: 'Noto Bengali UI · নতুন' },
  { id: 'bncond', family: 'Bengali Sans Condensed', en: 'Bengali Sans Condensed', bn: 'Bengali Sans Condensed · নতুন' },
  { id: 'bnxcond', family: 'Bengali Sans Extra Condensed', en: 'Bengali Sans Extra Condensed', bn: 'Bengali Sans Extra Condensed · নতুন' },
  { id: 'bnlight', family: 'Bengali Sans Light', en: 'Bengali Sans Light', bn: 'Bengali Sans Light · নতুন' },
  { id: 'bnblack', family: 'Bengali Sans Black', en: 'Bengali Sans Black', bn: 'Bengali Sans Black · নতুন' },
  { id: 'bnsercond', family: 'Bengali Serif Condensed', en: 'Bengali Serif Condensed', bn: 'Bengali Serif Condensed · নতুন' },
  { id: 'bnsersemi', family: 'Bengali Serif Semi Condensed', en: 'Bengali Serif Semi Condensed', bn: 'Bengali Serif Semi Condensed · নতুন' },
  { id: 'bnserextra', family: 'Bengali Serif Extra Condensed', en: 'Bengali Serif Extra Condensed', bn: 'Bengali Serif Extra Condensed · নতুন' },
  { id: 'bnserblack', family: 'Bengali Serif Black', en: 'Bengali Serif Black', bn: 'Bengali Serif Black · নতুন' },
  { id: 'charis', family: 'Charis SIL', en: 'Charis SIL', bn: 'Charis SIL · নতুন' }
]);

export function sanitizeUiFont(value) {
  return typeof value === 'string' && UI_FONTS.some(font => font.id === value) ? value : DEFAULT_UI_FONT;
}

/** CSS font-family list for an option. Falls back to the system stack so
    glyphs outside the subset (e.g. the Arabic ﷺ sign) still render. */
export function uiFontStack(id) {
  const font = UI_FONTS.find(item => item.id === sanitizeUiFont(id));
  return font.family ? `"${font.family}", ${SYSTEM_STACK}` : SYSTEM_STACK;
}

export function uiFontLabel(id, lang = 'en') {
  const font = UI_FONTS.find(item => item.id === id);
  return font ? (lang === 'bn' ? font.bn : font.en) : '';
}
