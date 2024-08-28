import { Card, CardComponent } from '@/components/ui/suggestion-card';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

export default function SummaryView({
  destinations,
  selectedDestinations,
  // onBack,
  onRemove,
}: {
  destinations: any[];
  selectedDestinations: any[];
  // onBack: () => void;
  onRemove: (plc: string) => void;
}) {
  const selectedPlaces = selectedDestinations;

  return (
    <div className="max-w-4xl mx-auto py-2">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Selected Destinations</h2>
          {/* <Button
                    variant="ghost"
                    onClick={onBack}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Selection
                </Button> */}
        </div>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
            {selectedPlaces.map((place, index) => (
              <MotionCard
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(place);
                  }}
                  aria-label={`Remove ${place.properties.name}`}
                >
                  <X className="w-4 h-4" />
                </Button>
                <CardComponent data={place} />
              </MotionCard>
            ))}
          </motion.div>
        </AnimatePresence>
        {selectedPlaces.length === 0 && (
          <p className="text-center text-muted-foreground">
            No destinations selected. Go back to add some!
          </p>
        )}
      </div>
    </div>
  );
}
