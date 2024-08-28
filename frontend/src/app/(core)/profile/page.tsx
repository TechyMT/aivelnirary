'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plane,
  Map,
  Compass,
  Globe,
  Mail,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import ShineBorder from '@/components/magicui/shine-border';
import Meteors from '@/components/magicui/meteors';
import Heading from '@/components/ui/heading';
import FadeIn from '@/components/ui/blur-fade';
import Loader from '@/components/ui/loader';
import { generateItineraryMarkdown } from '@/lib/utils';
import Link from 'next/link';
import SparklesText from '@/components/magicui/sparkles-text';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function getInitials(name: string): string {
  if (name.split(' ').length > 1) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Home() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<any>('');
  const [selectedItinerary, setSelectedItinerary] = useState<any>(null);
  const { data: session } = useSession();

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(selectedItinerary.content);
  };

  const handleSave = () => {
    setSelectedItinerary({ ...selectedItinerary, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  if (!session) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  const itineraries = session?.user?.itineraries || [];

  return (
    <FadeIn>
      <motion.div
        layoutId="shine-border-outer-div"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ShineBorder
          className="my-10 shadow-xl p-7 max-w-6xl mx-auto rounded-lg"
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          borderWidth={2}
        >
          <div className="modal relative flex items-center flex-grow px-6 py-10 overflow-hidden min-w-[600px]">
            <Meteors number={30} />
            <div className="flex items-center flex-grow justify-center">
              <Heading>Profile</Heading>
            </div>
          </div>
          <div className="relative w-full">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pt-0">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage
                    src={session.user!.image!}
                    // src="https://github.com/shadcn.png"
                    alt="User Profile Photo"
                  />
                  <AvatarFallback>
                    {getInitials(session?.user?.name) ?? 'U'}
                    {/* MT */}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-bold">
                  {session.user!.name}
                  {/* Mustafa Trunkwala */}
                </CardTitle>
                <CardDescription>
                  {session?.user?.title ?? 'Adventurer'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  {session?.user?.bio ?? 'Travel enthusiast'}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-center">
                    Travel Interests
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {session &&
                      session.user?.persona?.prefered_activities &&
                      Object.entries(
                        session.user.persona.prefered_activities
                      ).map(([activityKey, isSelected]) => {
                        if (isSelected) {
                          const capitalizedActivityKey =
                            activityKey.charAt(0).toUpperCase() +
                            activityKey.slice(1);
                          return (
                            <Badge key={activityKey}>
                              {capitalizedActivityKey}
                            </Badge>
                          );
                        }
                        return null; // Ensure to return null when the condition is not met
                      })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Link href={'/create-itinerary'} target="_self">
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Plan Trip
                  </Button>
                </Link>
                <Link href={'mailto:mustafatrunkwala8@gmail.com'}>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Your Itineraries</h2>
              <ScrollArea className="h-[300px] w-full rounded-md">
                <div className="space-y-4">
                  {itineraries.length === 0 && (
                    <div className="flex flex-col gap-8 justify-center items-center">
                      <div className="text-center text-muted-foreground">
                        No itineraries found
                      </div>
                      <div>
                        <Link href={'/create-itinerary'}>
                          <Button>
                            <Globe className="h-4 w-4 mr-2" />
                            Start Planning
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  {itineraries.map((itinerary) => (
                    <Dialog key={itinerary._id}>
                      <DialogTrigger asChild>
                        <div
                          className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent cursor-pointer"
                          onClick={() => setSelectedItinerary(itinerary)}
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center">
                            <Plane className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">
                              {itinerary.source} to {itinerary.destination}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(
                                itinerary.start_date
                              ).toLocaleDateString()}{' '}
                              | <Clock className="w-3 h-3 inline mr-1" />
                              {itinerary.duration} days
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>
                            {itinerary.source} to {itinerary.destination}
                          </DialogTitle>
                          <DialogDescription>
                            {new Date(
                              itinerary.start_date
                            ).toLocaleDateString()}{' '}
                            | {itinerary.duration} days
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4">
                          <ScrollArea className="h-[500px] w-full rounded-md">
                            <ReactMarkdown className="markdown">
                              {generateItineraryMarkdown(
                                selectedItinerary,
                                session.user.name
                              ) || ''}
                            </ReactMarkdown>
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ShineBorder>
      </motion.div>
    </FadeIn>
  );
}
