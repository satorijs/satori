import segment from '@satorijs/element'
import { Dict } from 'cosmokit'

export function jsx(
  type: string,
  attrs: Dict<any>,
  ...children: segment.Fragment[]
) {
  return segment(type, attrs, ...children)
}

declare global {
  namespace JSX {
    interface Element extends segment {}
  }
}
