import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { dreamFormSchema } from '@/lib/schemas';
import {
  colors,
  dreamTimes,
  emotions,
  interpretationTypes,
  socialStatuses,
} from '@/lib/constants';
import type { z } from 'zod';

type DreamFormValues = z.infer<typeof dreamFormSchema>;

export function DreamForm() {
  const form = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      emotions: [],
      colors: [],
      isRecurring: false,
    },
  });

  function onSubmit(values: DreamFormValues) {
    toast.success('Dream analysis submitted!', {
      description: 'Our AI is analyzing your dream...',
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dreamDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Dream Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your dream in detail..."
                  className="min-h-[100px] bg-secondary/50 border-0 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emotions"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg">Emotions During the Dream</FormLabel>
              <ScrollArea className="h-[200px] w-full rounded-md bg-secondary/50 p-4">
                <div className="space-y-4">
                  {emotions.map((emotion) => (
                    <FormField
                      key={emotion}
                      control={form.control}
                      name="emotions"
                      render={({ field }) => (
                        <FormItem
                          key={emotion}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(emotion)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, emotion])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== emotion
                                      )
                                    );
                              }}
                              className="border-primary data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {emotion}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg">Colors in the Dream</FormLabel>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <FormField
                    key={color}
                    control={form.control}
                    name="colors"
                    render={({ field }) => (
                      <FormItem key={color}>
                        <FormControl>
                          <Badge
                            variant={
                              field.value?.includes(color)
                                ? 'default'
                                : 'outline'
                            }
                            className="cursor-pointer hover:bg-primary/90"
                            onClick={() => {
                              return field.value?.includes(color)
                                ? field.onChange(
                                    field.value?.filter(
                                      (value) => value !== color
                                    )
                                  )
                                : field.onChange([...field.value, color]);
                            }}
                          >
                            {color}
                          </Badge>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dreamTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Dream Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-secondary/50 border-0">
                      <SelectValue placeholder="Select dream time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dreamTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRecurring"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md bg-secondary/50 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-lg">Recurring Dream</FormLabel>
                  <FormDescription>
                    Check if this dream occurs repeatedly
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-secondary/50 border-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Social Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-secondary/50 border-0">
                      <SelectValue placeholder="Select social status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {socialStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Occupation/Studies</FormLabel>
              <FormControl>
                <Input
                  className="bg-secondary/50 border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="peopleRelations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">People/Relationships in Dream</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-secondary/50 border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placesSignificance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Places/Significance</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-secondary/50 border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interpretationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Interpretation Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-secondary/50 border-0">
                    <SelectValue placeholder="Select interpretation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {interpretationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Analyze Dream
        </Button>
      </form>
    </Form>
  );
}