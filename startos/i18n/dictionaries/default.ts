export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  Editor: 0,
  'Ready to edit documents': 1,
  'Not ready to edit documents': 2,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
