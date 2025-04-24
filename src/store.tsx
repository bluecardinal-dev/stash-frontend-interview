import { atomWithStorage } from 'jotai/utils';
import { Hotel } from './lib/types';

export const savedHotelsAtom = atomWithStorage<Hotel[]>('savedHotels', []);
