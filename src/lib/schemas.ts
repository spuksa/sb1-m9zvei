import * as z from 'zod';
import { colors, dreamTimes, emotions, interpretationTypes, socialStatuses } from './constants';

export const dreamFormSchema = z.object({
  dreamDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters')
    .max(1000, 'Please keep the description under 1000 characters'),
  emotions: z.array(z.enum(emotions)).min(1, 'Select at least one emotion'),
  colors: z.array(z.enum(colors)).min(1, 'Select at least one color'),
  dreamTime: z.enum(dreamTimes),
  isRecurring: z.boolean(),
  age: z.string().min(1, 'Age is required'),
  socialStatus: z.enum(socialStatuses),
  occupation: z.string().min(1, 'Occupation is required'),
  peopleRelations: z.string().min(1, 'Please describe the people in your dream'),
  placesSignificance: z.string().min(1, 'Please describe the places in your dream'),
  interpretationType: z.enum(interpretationTypes),
});