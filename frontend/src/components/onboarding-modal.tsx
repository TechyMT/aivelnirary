'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ShineBorder from './magicui/shine-border';
import Meteors from '@/components/magicui/meteors';
import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import Heading from './ui/heading';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import {
  Check,
  Camera,
  Mountain,
  Drama,
  MoonStar,
  LeafyGreen,
  Citrus,
} from 'lucide-react';
import { getBaseUrl } from '@/lib/utils';
import { toast } from 'sonner';

const MotionCard = motion(Card);

interface OnboardingModalProps {}

interface PreferredActivities {
  [key: string]: boolean | undefined;
}

interface FoodPreferences {
  local_cuisine?: boolean;
  vegetarian?: boolean;
}

interface FormData {
  name?: string;
  age?: string;
  title?: string;
  bio?: string;
  preferredActivities: PreferredActivities;
  foodPreferences: FoodPreferences;
  tripStyle?: string;
}

function toCamelCase(str: string): string {
  const spacedStr = str.replace(/_/g, ' ');
  return spacedStr
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const OnboardingModal: React.FC<OnboardingModalProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    preferredActivities: {
      sightseeing: undefined,
      adventure: undefined,
      cultural_experiences: undefined,
      nightlife: undefined,
    },
    foodPreferences: {
      local_cuisine: undefined,
      vegetarian: undefined,
    },
    tripStyle: undefined,
  });

  const steps = [
    { title: 'Personal Information' },
    { title: 'Preferred Activities' },
    { title: 'Food Preferences & Trip Style' },
  ];
  const icons = {
    prefferedActivites: {
      sightseeing: <Camera className="w-6 h-6" />,
      adventure: <Mountain className="w-6 h-6" />,
      cultural_experiences: <Drama className="w-6 h-6" />,
      nightlife: <MoonStar className="w-6 h-6" />,
    },
    foodPreferences: {
      vegetarian: <LeafyGreen className="w-6 h-6" />,
      local_cuisine: <Citrus className="w-6 h-6" />,
    },
  };

  const validateForm = (): boolean => {
    if (currentStep === 0) {
      return (
        !formData.name || !formData.age || !formData.title || !formData.bio
      );
    } else if (currentStep === 1) {
      return !Object.values(formData.preferredActivities).some(
        (activity) => activity === true
      );
    } else if (currentStep === 2) {
      return (
        !Object.values(formData.foodPreferences).some(
          (preference) => preference === true
        ) || !formData.tripStyle
      );
    }
    return false;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const [mainKey, subKey] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [mainKey]: {
          ...(prevData[mainKey as keyof FormData] as Record<string, boolean>),
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleNext = (index: number) => {
    if (index !== -1 && index < currentStep) {
      setCurrentStep(index);
    } else if (validateForm()) {
      toast.error('Please fill out all the fields');
      return;
    } else if (index !== -1) {
      return setCurrentStep(index);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      toast.error('Please fill out all the fields');
      return;
    }

    const body = {
      ...formData,
      persona: {
        prefered_activities: Object.keys(formData.preferredActivities).reduce(
          (acc, activity) => {
            acc[activity] =
              formData.preferredActivities[
                activity as keyof PreferredActivities
              ] ?? false;
            return acc;
          },
          {} as Record<string, boolean>
        ),
        food_preferences: Object.keys(formData.foodPreferences).reduce(
          (acc, preference) => {
            acc[preference] =
              formData.foodPreferences[preference as keyof FoodPreferences] ??
              false;
            return acc;
          },
          {} as Record<string, boolean>
        ),
        tripstyle: formData.tripStyle,
      },
      profile_completed: true,
    };

    try {
      const response = await axios.put(
        `${getBaseUrl()}/user/update/${session?.user.id}`,
        body
      );

      if (response.status === 200) {
        update();
        router.replace('/');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  if (status === 'loading') {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-white bg-opacity-0 text-black overflow-auto">
      <ShineBorder
        className="shadow-xl z-50 rounded-lg max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col md:max-w-[1024px] md:max-h-[90vh]"
        color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
        borderWidth={2}
      >
        <div className="relative bg-white rounded-lg max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col md:max-w-[1024px] md:max-h-[90vh] overflow-auto">
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-grow">
              <div className="flex-col flex-grow">
                <div className="w-full md:w-full flex-none">
                  <div className="relative flex items-center flex-grow px-6 py-10 overflow-hidden">
                    <Meteors number={30} />
                    <div className="flex items-center flex-grow justify-center">
                      <Heading>Welcome</Heading>
                    </div>
                  </div>
                  <div className="px-2 py-2 text-black overflow-y-auto flex justify-center">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`py-2 px-4 cursor-pointer rounded-lg ${
                          index === currentStep
                            ? 'bg-gray-100'
                            : 'bg-transparent'
                        }`}
                      >
                        <div
                          className={`flex items-center ${
                            index === currentStep ? 'text-blue-600' : ''
                          }`}
                          onClick={() => handleNext(index)}
                        >
                          <div
                            className={`h-5 w-5 mr-2 flex items-center justify-center text-white rounded-full ${
                              index === currentStep
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                            }`}
                          >
                            {index + 1}
                          </div>
                          {step.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-grow p-6 overflow-y-auto">
                  {currentStep === 0 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        {steps[currentStep].title}
                      </h2>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full mb-4"
                      />
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <Input
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        type="number"
                        className="w-full mb-4"
                      />

                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>

                      <Input
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Enter a title that describes you (eg. Wanderlust)"
                        className="w-full mb-4"
                      />

                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bio
                      </label>

                      <Textarea
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        placeholder="Enter a short bio about yourself"
                        className="w-full mb-4 p-2 border rounded-md max-h-[180px]"
                        maxLength={200}
                      />
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        {steps[currentStep].title}
                      </h2>

                      <div className="max-w-4xl mx-auto py-2">
                        <div className="space-y-6">
                          <AnimatePresence>
                            <motion.div
                              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.07,
                                  },
                                },
                              }}
                            >
                              {Object.keys(formData.preferredActivities).map(
                                (activity, index) => (
                                  <MotionCard
                                    key={index}
                                    variants={{
                                      hidden: {
                                        opacity: 0,
                                        y: 20,
                                      },
                                      visible: {
                                        opacity: 1,
                                        y: 0,
                                      },
                                    }}
                                    exit={{
                                      opacity: 0,
                                      scale: 0.5,
                                      transition: {
                                        duration: 0.2,
                                      },
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                    }}
                                    whileTap={{
                                      scale: 0.95,
                                    }}
                                    className="relative overflow-hidden hover:shadow-md transition-all cursor-pointer"
                                    onClick={(e) =>
                                      handleChange({
                                        target: {
                                          name: `preferredActivities.${activity}`,
                                          value:
                                            !formData.preferredActivities[
                                              activity as keyof PreferredActivities
                                            ],
                                          type: 'checkbox',
                                        },
                                      } as unknown as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    role="checkbox"
                                    aria-checked={
                                      formData.preferredActivities[
                                        activity as keyof PreferredActivities
                                      ] || false
                                    }
                                    tabIndex={0}
                                  >
                                    <CardContent className="p-4 flex flex-col items-center text-center relative">
                                      {formData.preferredActivities[
                                        activity as keyof PreferredActivities
                                      ] && (
                                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                                          <Check className="w-3 h-3" />
                                        </div>
                                      )}
                                      {
                                        icons.prefferedActivites[
                                          activity as keyof typeof icons.prefferedActivites
                                        ]
                                      }
                                      <h2 className="text-sm font-semibold mb-1">
                                        {toCamelCase(activity)}
                                      </h2>
                                    </CardContent>
                                  </MotionCard>
                                )
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        {steps[currentStep].title}
                      </h2>
                      <div>
                        <label className="block mb-2">Food Preferences</label>
                        <AnimatePresence>
                          <motion.div
                            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: {
                                transition: {
                                  staggerChildren: 0.07,
                                },
                              },
                            }}
                          >
                            {Object.keys(formData.foodPreferences).map(
                              (preference, index) => (
                                <MotionCard
                                  key={index}
                                  variants={{
                                    hidden: {
                                      opacity: 0,
                                      y: 20,
                                    },
                                    visible: {
                                      opacity: 1,
                                      y: 0,
                                    },
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.5,
                                    transition: {
                                      duration: 0.2,
                                    },
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                  }}
                                  whileTap={{
                                    scale: 0.95,
                                  }}
                                  className="relative overflow-hidden hover:shadow-md transition-all cursor-pointer"
                                  onClick={(e) =>
                                    handleChange({
                                      target: {
                                        name: `foodPreferences.${preference}`,
                                        value:
                                          !formData.foodPreferences[
                                            preference as keyof FoodPreferences
                                          ],
                                        type: 'checkbox',
                                      },
                                    } as unknown as React.ChangeEvent<HTMLInputElement>)
                                  }
                                  role="checkbox"
                                  aria-checked={
                                    formData.foodPreferences[
                                      preference as keyof FoodPreferences
                                    ] || false
                                  }
                                  tabIndex={0}
                                >
                                  <CardContent className="p-4 flex flex-col items-center text-center relative">
                                    {formData.foodPreferences[
                                      preference as keyof FoodPreferences
                                    ] && (
                                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                                        <Check className="w-3 h-3" />
                                      </div>
                                    )}
                                    {
                                      icons.foodPreferences[
                                        preference as keyof typeof icons.foodPreferences
                                      ]
                                    }
                                    <h2 className="text-sm font-semibold mb-1">
                                      {toCamelCase(preference)}
                                    </h2>
                                  </CardContent>
                                </MotionCard>
                              )
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      <div className="mt-8">
                        <label
                          htmlFor="tripStyle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trip Style
                        </label>
                        <Select
                          name="tripStyle"
                          onValueChange={(value) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              tripStyle: value,
                            }));
                          }}
                          defaultValue={formData.tripStyle}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your trip style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="luxury">Luxury</SelectItem>
                              <SelectItem value="budget">Budget</SelectItem>
                              <SelectItem value="backpacking">
                                Backpacking
                              </SelectItem>
                              <SelectItem value="familyFriendly">
                                Family Friendly
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between p-4">
                <Button onClick={handlePrevious} disabled={currentStep === 0}>
                  Previous
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={() => handleNext(-1)}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </ShineBorder>
    </div>
  );
};

export default OnboardingModal;
