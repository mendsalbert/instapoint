"use client";

// Add these interfaces at the top of the file
interface Slide {
  id: string;
  title: string;
  content: string[];
  layout: string;
  theme: string;
  image?: string;
}

interface Layout {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

interface SlideContentProps {
  slide: Slide;
  theme: string;
  isTitle?: boolean;
  isEditing?: boolean;
  onEdit?: (slide: Slide) => void;
}

interface PresentationModeProps {
  slides: Slide[];
  currentSlide: number;
  onExit: () => void;
  theme: string;
  participants: Participant[];
}

interface ParticipantsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  presentationId: string;
  participants: Participant[];
}

interface Participant {
  id: string;
  name: string;
  image: string;
  role: string;
  hasHand: boolean;
}

// Add this interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  X,
  Share2,
  Users,
  MessageSquare,
  Hand,
  ImageIcon,
  Layout,
  Palette,
  PanelTop,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  Clock,
  LayoutTemplate,
  LayoutList,
  FileText,
  Play,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SimulationOverlay from "../simulation/page";

// Enhance Theme interface with more styling options
interface Theme {
  id: string;
  name: string;
  background: string;
  titleGradient?: string;
  contentBackground?: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
  bulletColor?: string;
  fontFamily?: string;
  slidePattern?: string;
  // Add new styling properties
  borderAccent?: string;
  decorativeElements?: string[];
  headerStyle?: string;
  bulletStyle?: string;
  containerStyle?: string;
  shadowStyle?: string;
  preview?: {
    light: string;
    dark: string;
  };
}

// Update layout templates to be more descriptive
const LAYOUTS = {
  focus: "Big Title",
  split: "Split View",
  content: "Content Focus",
  media: "Media Heavy",
  minimal: "Minimal",
};

// Mock participants data
const PARTICIPANTS = [
  {
    id: 1,
    name: "Sarah Chen",
    image: "/avatars/sarah.jpg",
    role: "Product Manager",
    hasHand: true,
  },
  {
    id: 2,
    name: "Alex Kim",
    image: "/avatars/alex.jpg",
    role: "Developer",
    hasHand: false,
  },
  {
    id: 3,
    name: "Maria Garcia",
    image: "/avatars/maria.jpg",
    role: "Designer",
    hasHand: false,
  },
  {
    id: 4,
    name: "John Smith",
    image: "/avatars/john.jpg",
    role: "Marketing",
    hasHand: true,
  },
];

// Mock slide data with more structure
const DEMO_SLIDES = [
  {
    title: "Introduction to InstaPoint",
    layout: "title",
    content: "AI-Powered Presentations",
    image: "/slides/intro.jpg",
    theme: "modern",
  },
  {
    title: "Revolutionary Features",
    layout: "twoColumn",
    content: [
      "Real-time Generation",
      "Smart Formatting",
      "Audience Engagement",
    ],
    image: "/slides/features.jpg",
    theme: "default",
  },
  {
    title: "How It Works",
    layout: "imageRight",
    content: "Speak naturally while AI creates beautiful slides",
    image: "/slides/demo.jpg",
    theme: "minimal",
  },
];

// Add interface for slides
interface PresentationContext {
  title: string;
  description: string;
  keyPoints: string[];
  currentContext: string;
}

// Enhanced theme collection with more PowerPoint-like designs
const PRESENTATION_THEMES: Theme[] = [
  {
    id: "corporate",
    name: "Corporate Blue",
    background: "bg-gradient-to-br from-blue-50 to-sky-50",
    titleGradient: "bg-gradient-to-r from-blue-700 to-sky-700",
    contentBackground: "bg-white/95",
    accentColor: "blue-600",
    textColor: "text-gray-800",
    secondaryTextColor: "text-gray-600",
    bulletColor: "bg-blue-600",
    fontFamily: "font-sans",
    borderAccent: "border-l-4 border-blue-600",
    headerStyle: "border-b-2 border-blue-200 pb-4",
    bulletStyle: "rounded-sm rotate-45",
    containerStyle: "px-12 py-8 bg-gradient-to-br from-blue-50/50 to-white",
    shadowStyle: "shadow-lg shadow-blue-100/50",
    decorativeElements: [
      "absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full",
      "absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-tr-full",
    ],
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    titleGradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    contentBackground: "bg-gray-800/90",
    accentColor: "purple-400",
    textColor: "text-white",
    secondaryTextColor: "text-gray-300",
    bulletColor: "bg-purple-400",
    fontFamily: "font-sans",
    borderAccent: "border-l-4 border-purple-400",
    headerStyle: "border-b border-gray-700 pb-4",
    bulletStyle: "rounded-full",
    containerStyle: "px-12 py-8 bg-black/20 backdrop-blur-sm",
    shadowStyle: "shadow-xl shadow-purple-900/20",
    decorativeElements: [
      "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.purple.400/0.1),_transparent_50%)]",
    ],
  },
  {
    id: "minimalist",
    name: "Minimalist",
    background: "bg-neutral-50",
    titleGradient: "bg-neutral-900",
    contentBackground: "bg-white",
    accentColor: "neutral-900",
    textColor: "text-neutral-900",
    secondaryTextColor: "text-neutral-600",
    bulletColor: "bg-neutral-800",
    fontFamily: "font-light",
    borderAccent: "border-l border-neutral-200",
    headerStyle: "border-b border-neutral-200 pb-4",
    bulletStyle: "w-1 h-1",
    containerStyle: "px-12 py-8",
    shadowStyle: "shadow-sm",
  },
  {
    id: "gradient-purple",
    name: "Gradient Purple",
    background: "bg-gradient-to-br from-purple-100 to-pink-50",
    titleGradient: "bg-gradient-to-r from-purple-700 to-pink-600",
    contentBackground: "bg-white/80 backdrop-blur-sm",
    accentColor: "purple-600",
    textColor: "text-gray-800",
    secondaryTextColor: "text-gray-600",
    bulletColor: "bg-purple-600",
    fontFamily: "font-sans",
    borderAccent: "border-l-4 border-purple-400",
    headerStyle: "border-b-2 border-purple-100 pb-4",
    bulletStyle: "rounded-full",
    containerStyle:
      "px-16 py-12 bg-white/40 backdrop-blur-md rounded-2xl mx-12",
    shadowStyle: "shadow-2xl shadow-purple-100/50",
    decorativeElements: [
      "absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl",
      "absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl",
    ],
  },
  {
    id: "modern-teal",
    name: "Modern Teal",
    background: "bg-gradient-to-br from-teal-50 to-emerald-50",
    titleGradient: "bg-gradient-to-r from-teal-600 to-emerald-600",
    contentBackground: "bg-white/90",
    accentColor: "teal-600",
    textColor: "text-gray-800",
    secondaryTextColor: "text-gray-600",
    bulletColor: "bg-teal-500",
    fontFamily: "font-sans",
    borderAccent: "border-l-4 border-teal-400",
    headerStyle: "pb-6",
    bulletStyle: "rounded-sm transform rotate-45",
    containerStyle: "px-16 py-12 bg-white/60 backdrop-blur-sm",
    shadowStyle: "shadow-xl shadow-teal-100/50",
    decorativeElements: [
      "absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_theme(colors.teal.50),_transparent_60%)]",
    ],
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark",
    background: "bg-[radial-gradient(circle_at_top,_#2C3E50,_#1A1A1A)]",
    titleGradient: "bg-gradient-to-r from-amber-300 to-yellow-300",
    contentBackground: "bg-black/30",
    accentColor: "amber-400",
    textColor: "text-white",
    secondaryTextColor: "text-gray-300",
    bulletColor: "bg-amber-400",
    fontFamily: "font-serif",
    borderAccent: "border-l-2 border-amber-400/30",
    headerStyle: "border-b border-amber-400/20 pb-6",
    bulletStyle: "rounded-full",
    containerStyle: "px-16 py-12 bg-black/20 backdrop-blur-md",
    shadowStyle: "shadow-2xl shadow-amber-900/30",
    decorativeElements: [
      "absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_theme(colors.amber.900/0.2),_transparent_40%)]",
      "absolute top-0 right-0 w-32 h-32 bg-amber-400/5 blur-2xl",
    ],
  },
];

const SLIDE_LAYOUTS: Layout[] = [
  {
    id: "title",
    name: "Title Slide",
    iconName: "LayoutTemplate",
    description: "Large title with optional subtitle",
  },
  {
    id: "content",
    name: "Content",
    iconName: "LayoutList",
    description: "Title with bullet points",
  },
  {
    id: "split",
    name: "Split Content",
    iconName: "Layout",
    description: "Two-column layout",
  },
  // Add more layouts...
];

// Add image generation interface
interface ImageGeneration {
  url: string;
  loading: boolean;
  error?: string;
}

// Update SlideContent component
const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  theme,
  isTitle = false,
  isEditing = false,
  onEdit,
}) => {
  const currentTheme =
    PRESENTATION_THEMES.find((t) => t.id === theme) || PRESENTATION_THEMES[0];

  // Add editable content handling
  const [editableContent, setEditableContent] = useState({
    title: slide.title,
    content: slide.content,
  });

  // Handle content updates
  const handleContentUpdate = (
    type: "title" | "content",
    value: string | string[]
  ) => {
    setEditableContent((prev) => ({
      ...prev,
      [type]: value,
    }));
    onEdit?.({ ...slide, [type]: value });
  };

  // Limit content to 2 points when not in title slide
  const limitedContent = isTitle ? slide.content : slide.content.slice(0, 2);

  if (isTitle) {
    return (
      <div
        className={`relative h-full overflow-hidden ${currentTheme.background}`}
      >
        {isEditing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <Input
              value={editableContent.title}
              onChange={(e) => handleContentUpdate("title", e.target.value)}
              className="text-4xl text-center border-transparent bg-transparent hover:bg-white/10"
              placeholder="Enter title..."
            />
            <Textarea
              value={editableContent.content[0] || ""}
              onChange={(e) => handleContentUpdate("content", [e.target.value])}
              className="mt-8 text-xl text-center border-transparent bg-transparent hover:bg-white/10"
              placeholder="Enter subtitle..."
            />
          </div>
        ) : (
          <div
            className={`
            h-full flex flex-col items-center justify-center text-center
            ${currentTheme.containerStyle}
            relative z-10
            animate-fadeIn
            px-24 py-16
          `}
          >
            {slide.image && (
              <div className="absolute inset-0 opacity-10">
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1
              className={`
              text-6xl font-bold mb-12
              ${
                currentTheme.titleGradient
                  ? `${currentTheme.titleGradient} bg-clip-text text-transparent`
                  : currentTheme.textColor
              }
              ${currentTheme.fontFamily}
              tracking-tight
              animate-slideUp
              max-w-4xl
            `}
            >
              {slide.title}
            </h1>
            {limitedContent.map((point, i) => (
              <p
                key={i}
                className={`
                text-xl ${currentTheme.secondaryTextColor}
                max-w-3xl ${currentTheme.fontFamily}
                animate-slideUp
                leading-relaxed
              `}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {point.replace(/\*\*/g, "")}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative h-full ${currentTheme.background}`}>
      {/* Decorative elements */}
      {currentTheme.decorativeElements?.map((element, i) => (
        <div key={i} className={element} />
      ))}

      {isEditing ? (
        <div className="absolute inset-0 p-12">
          <Input
            value={editableContent.title}
            onChange={(e) => handleContentUpdate("title", e.target.value)}
            className="text-2xl border-transparent bg-transparent hover:bg-white/10"
            placeholder="Enter slide title..."
          />
          <div className="mt-8 space-y-4">
            {/* Limit to 2 input fields */}
            {[0, 1].map((idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-current" />
                <Input
                  value={editableContent.content[idx] || ""}
                  onChange={(e) => {
                    const newContent = [...editableContent.content];
                    newContent[idx] = e.target.value;
                    // Ensure only 2 points
                    handleContentUpdate("content", newContent.slice(0, 2));
                  }}
                  className="border-transparent bg-transparent hover:bg-white/10"
                  placeholder={`Point ${idx + 1}...`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`
          h-full ${currentTheme.containerStyle}
          ${currentTheme.shadowStyle} relative z-10
          grid ${slide.image ? "grid-cols-2 gap-12" : ""}
          px-16 py-12
        `}
        >
          <div className="flex flex-col">
            <h2
              className={`
              text-3xl font-semibold mb-8
              ${
                currentTheme.titleGradient
                  ? `${currentTheme.titleGradient} bg-clip-text text-transparent`
                  : currentTheme.textColor
              }
              ${currentTheme.fontFamily}
            `}
            >
              {slide.title}
            </h2>

            <div className="flex-1 flex flex-col justify-center space-y-4">
              {limitedContent.map((point, i) => (
                <div
                  key={i}
                  className={`
                  flex items-start space-x-4 animate-fadeIn pl-4
                  ${currentTheme.borderAccent}
                `}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`
                    w-1.5 h-1.5 mt-2 flex-shrink-0
                    ${currentTheme.bulletColor}
                    ${currentTheme.bulletStyle}
                  `}
                  />
                  <p
                    className={`
                    text-lg leading-relaxed break-words
                    ${currentTheme.secondaryTextColor}
                    ${currentTheme.fontFamily}
                  `}
                  >
                    {point.replace(/\*\*/g, "")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {slide.image && (
            <div className="flex items-center justify-center p-4">
              <img
                src={slide.image}
                alt=""
                className="rounded-lg shadow-lg max-h-full object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Add a utility function at the top of the file
const generateUniqueId = () =>
  `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Add Participants Panel component
const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({
  isOpen,
  onClose,
  presentationId,
  participants,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const joinUrl = `${window.location.origin}/join/${presentationId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Participants</DialogTitle>
          <DialogDescription>
            Share this link to invite others to your presentation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
            <Input value={joinUrl} readOnly className="bg-transparent" />
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Current Participants</h3>
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage src={participant.image} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{participant.name}</p>
                  <p className="text-xs text-zinc-500">{participant.role}</p>
                </div>
                {participant.hasHand && (
                  <Badge variant="outline" className="ml-auto">
                    <Hand className="h-3 w-3 mr-1" />
                    Raised Hand
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add Presentation Mode component
const PresentationMode: React.FC<PresentationModeProps> = ({
  slides,
  currentSlide,
  onExit,
  theme,
  participants,
}) => {
  const [slideIndex, setSlideIndex] = useState(currentSlide);
  const [showParticipants, setShowParticipants] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setSlideIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === "Escape") onExit();
      if (e.key === "p") setShowParticipants((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [slides.length, onExit]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full" style={{ aspectRatio: "16/9" }}>
          <SlideContent
            slide={slides[slideIndex]}
            theme={theme}
            isTitle={slides[slideIndex].layout === "title"}
          />
        </div>
      </div>

      {/* Participants Panel */}
      {showParticipants && (
        <div className="absolute right-4 top-4 w-64 bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-medium">Participants</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setShowParticipants(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {/* {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.image} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">
                      {participant.name}
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      {participant.role}
                    </p>
                  </div>
                  {participant.hasHand && (
                    <Hand className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
              ))} */}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-white"
          onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
          disabled={slideIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="bg-white/10 px-4 py-2 rounded-full">
          {slideIndex + 1} / {slides.length}
        </div>

        <Button
          variant="ghost"
          className="text-white"
          onClick={() =>
            setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
          }
          disabled={slideIndex === slides.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Exit button */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white"
        onClick={onExit}
      >
        <X className="h-4 w-4 mr-2" />
        Exit
      </Button>

      {/* Toggle participants button */}
      {!showParticipants && (
        <Button
          variant="ghost"
          className="absolute top-4 right-4 text-white"
          onClick={() => setShowParticipants(true)}
        >
          <Users className="h-4 w-4 mr-2" />
          Show Participants
        </Button>
      )}

      {/* Add the simulation overlay */}
      <SimulationOverlay />
    </div>
  );
};

// Add this to handle client-side only features
const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// First, add a SlidesSkeleton component
const SlidesSkeleton = () => {
  return (
    <div className="space-y-8 w-full animate-pulse">
      {/* Title Slide Skeleton */}
      <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-full flex flex-col items-center justify-center p-12">
          <div className="w-2/3 h-12 bg-zinc-100 rounded-lg mb-8" />
          <div className="w-1/2 h-6 bg-zinc-100 rounded-lg" />
        </div>
      </div>

      {/* Content Slides Skeleton */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-full p-12">
            <div className="w-1/3 h-8 bg-zinc-100 rounded-lg mb-12" />
            <div className="space-y-6">
              <div className="w-3/4 h-6 bg-zinc-100 rounded-lg" />
              <div className="w-2/3 h-6 bg-zinc-100 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Add a thumbnail skeleton component
const ThumbnailSkeleton = () => {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="aspect-video rounded-lg border border-zinc-200 overflow-hidden animate-pulse"
        >
          <div className="p-3 bg-white">
            <div className="w-2/3 h-3 bg-zinc-100 rounded mb-2" />
            <div className="w-1/3 h-2 bg-zinc-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function VoicePresentationPage() {
  // Add all required state variables
  const [presentationId] = useState(
    () => generateUniqueId() // This will now only run once on mount
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [showContextModal, setShowContextModal] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showThumbnailView, setShowThumbnailView] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [presentationContext, setPresentationContext] =
    useState<PresentationContext>({
      title: "",
      description: "",
      keyPoints: [],
      currentContext: "",
    });
  const [selectedTheme, setSelectedTheme] = useState(PRESENTATION_THEMES[0].id);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showLayoutPanel, setShowLayoutPanel] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
  const [slideNotes, setSlideNotes] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreSlides, setHasMoreSlides] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>(
    PARTICIPANTS.map((p) => ({ ...p, id: p.id.toString() })) // Convert id to string
  );

  const slideGenerationProgress = useRef(0);

  // Update the handleGeneratePresentation function
  const handleGeneratePresentation = async () => {
    // Validate input before proceeding
    if (
      !presentationContext.title.trim() ||
      !presentationContext.description.trim()
    ) {
      // You might want to show an error message here
      return;
    }

    setIsGenerating(true);
    setShowContextModal(false);

    try {
      // Generate initial slides only when user clicks generate
      const response = await fetch("/api/generate-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...presentationContext,
          stage: "initial",
        }),
      });

      const initialSlides = await response.json();
      setSlides(initialSlides);
      slideGenerationProgress.current = initialSlides.length;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Remove the automatic slide generation effect
  useEffect(() => {
    // Only track current slide position
    if (currentSlide >= slides.length - 1) {
      setHasMoreSlides(false);
    }
  }, [currentSlide, slides.length]);

  // Update the handleGenerateMore function
  const handleGenerateMore = async () => {
    if (!hasMoreSlides || isLoadingMore || slides.length >= 12) return;

    setIsLoadingMore(true);
    try {
      const response = await fetch("/api/generate-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...presentationContext,
          stage: "continue",
          currentProgress: slideGenerationProgress.current,
          existingSlides: slides,
        }),
      });

      const newSlides = await response.json();

      // Check if we've reached the end of content slides
      if (
        slides.length >= 10 ||
        (newSlides.length === 0 && slides.length >= 8)
      ) {
        // Add Q&A and Thank You slides
        const finalSlides = [
          {
            id: `slide-${slides.length + 1}`,
            title: "Questions & Answers",
            content: [
              "We'd love to hear your thoughts and questions",
              "Feel free to raise your hand or use the chat",
            ],
            layout: "focus",
            theme: selectedTheme,
          },
          {
            id: `slide-${slides.length + 2}`,
            title: "Thank You!",
            content: [
              `Thank you for attending our presentation on "${presentationContext.title}"`,
              "Contact: [Your Contact Information]",
            ],
            layout: "title",
            theme: selectedTheme,
          },
        ];
        setSlides((prev) => [...prev, ...finalSlides]);
        setHasMoreSlides(false);
      } else {
        setSlides((prev) => [...prev, ...newSlides]);
        slideGenerationProgress.current += newSlides.length;
      }
    } catch (error) {
      console.error("Error generating more slides:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Update the renderUpcomingSlides function to show remaining slide count
  const renderUpcomingSlides = () => {
    if (!slides.length) {
      return (
        <div className="p-4 text-center text-zinc-500">
          No slides generated yet. Enter a topic and description to begin.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {slides.slice(currentSlide + 1, currentSlide + 4).map((slide, i) => (
          <div
            key={slide.id || generateUniqueId()}
            className="p-4 rounded-lg border border-zinc-200 hover:border-blue-500 cursor-pointer transition-colors"
            onClick={() => setCurrentSlide(currentSlide + i + 1)}
          >
            <h4 className="text-sm font-medium mb-2">{slide.title}</h4>
            <div className="text-xs text-zinc-500">
              {Array.isArray(slide.content) &&
                slide.content.slice(0, 2).map((point, j) => (
                  <p key={`${slide.id}-point-${j}`} className="truncate">
                    {typeof point === "string"
                      ? point.replace(/\*\*/g, "")
                      : point}
                  </p>
                ))}
              {Array.isArray(slide.content) && slide.content.length > 2 && (
                <p className="text-blue-500">
                  + {slide.content.length - 2} more points
                </p>
              )}
            </div>
          </div>
        ))}

        {hasMoreSlides && slides.length < 12 && (
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGenerateMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              ) : (
                "Generate More Slides"
              )}
            </Button>
            <p className="text-xs text-center text-zinc-500">
              {12 - slides.length} more slides available
            </p>
          </div>
        )}
      </div>
    );
  };

  // Add handler for slide updates
  const handleSlideUpdate = (updatedSlide: Slide) => {
    const newSlides = [...slides];
    const index = newSlides.findIndex((slide) => slide.id === updatedSlide.id);
    if (index !== -1) {
      newSlides[index] = updatedSlide;
      setSlides(newSlides);
    }
  };

  // Rest of the component remains the same...
  return (
    <ClientOnly>
      <div className="fixed inset-0 flex flex-col bg-zinc-50">
        {/* Initial Modal */}
        <Dialog open={showContextModal} onOpenChange={setShowContextModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Create Instant Presentation
              </DialogTitle>
              <DialogDescription className="text-base">
                Enter your presentation details and we'll generate professional
                slides instantly.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-6">
              <div className="space-y-4">
                <label className="text-base font-medium">
                  Presentation Title
                </label>
                <Input
                  className="text-lg h-12"
                  placeholder="E.g., The Future of AI in Healthcare"
                  value={presentationContext.title}
                  onChange={(e) =>
                    setPresentationContext((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-4">
                <label className="text-base font-medium">
                  Brief Description
                </label>
                <Textarea
                  className="min-h-[100px] text-base"
                  placeholder="Describe your presentation's main points and objectives..."
                  value={presentationContext.description}
                  onChange={(e) =>
                    setPresentationContext((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                size="lg"
                onClick={handleGeneratePresentation}
                className="bg-black"
              >
                Generate Presentation
                {isGenerating && (
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Enhanced Top Bar */}
          <div className="h-14 bg-white border-b border-zinc-200 flex items-center px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.history.back()}
                    className="hover:bg-zinc-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Back to Dashboard</TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Auto-saving
                </Badge>
              </div>
            </div>

            <div className="ml-4 flex-1 flex items-center gap-2">
              <Input
                value={presentationContext.title}
                onChange={(e) =>
                  setPresentationContext((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="max-w-md font-medium border-transparent hover:border-zinc-200 focus:border-zinc-300"
              />
              <Button variant="ghost" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Invite
              </Button>
              <Button
                className="gap-2 bg-black hover:bg-black/90"
                onClick={() => setPresentationMode(true)}
              >
                <Play className="h-4 w-4" />
                Present
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex min-h-0">
            {/* Left Sidebar - Thumbnails */}
            <div className="w-64 border-r border-zinc-200 bg-white overflow-y-auto">
              <div className="p-4">
                {isGenerating ? (
                  <ThumbnailSkeleton />
                ) : (
                  <div className="space-y-3">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.id || generateUniqueId()} // Ensure unique key
                        className="group relative"
                      >
                        <div
                          className={`
                            aspect-video rounded-lg overflow-hidden cursor-pointer
                            border border-zinc-200 hover:border-blue-400 
                            shadow-sm hover:shadow-md transition-all
                            ${
                              currentSlide === index
                                ? "ring-2 ring-blue-500"
                                : ""
                            }
                          `}
                          onClick={() => setCurrentSlide(index)}
                        >
                          <div className="p-3 bg-white">
                            <div className="text-xs font-medium truncate mb-1">
                              {slide.title}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              Slide {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Slide Editor */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Toolbar */}
              <div className="h-12 border-b border-zinc-200 bg-white px-4 flex items-center gap-4 shrink-0">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESENTATION_THEMES.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded ${theme.background}`}
                          />
                          {theme.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="h-6 w-px bg-zinc-200" />

                <div className="flex items-center gap-2">
                  {SLIDE_LAYOUTS.map((layout) => (
                    <Button
                      key={layout.id}
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => {
                        if (slides[currentSlide]) {
                          const updatedSlides = [...slides];
                          updatedSlides[currentSlide] = {
                            ...updatedSlides[currentSlide],
                            layout: layout.id,
                          };
                          setSlides(updatedSlides);
                        }
                      }}
                    >
                      {layout.iconName === "LayoutTemplate" && (
                        <LayoutTemplate className="h-4 w-4" />
                      )}
                      {layout.iconName === "LayoutList" && (
                        <LayoutList className="h-4 w-4" />
                      )}
                      {layout.iconName === "Layout" && (
                        <Layout className="h-4 w-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Slide Canvas */}
              <div className="flex-1 p-8 bg-zinc-100 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
                  {isGenerating ? (
                    <SlidesSkeleton />
                  ) : (
                    <>
                      <div
                        className="relative w-full"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-white/80 hover:bg-white"
                          >
                            {isEditing ? "Done" : "Edit"}
                          </Button>
                        </div>

                        <div className="w-full h-full rounded-xl shadow-lg overflow-hidden">
                          {slides[currentSlide] && (
                            <SlideContent
                              slide={slides[currentSlide]}
                              theme={selectedTheme}
                              isTitle={slides[currentSlide].layout === "title"}
                              isEditing={isEditing}
                              onEdit={handleSlideUpdate}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between w-full max-w-3xl">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentSlide((s) => Math.max(0, s - 1))
                          }
                          disabled={currentSlide === 0}
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>

                        <div className="flex items-center gap-2">
                          {slides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentSlide(i)}
                              className={`h-2 rounded-full transition-all ${
                                i === currentSlide
                                  ? "w-8 bg-blue-600"
                                  : "w-2 bg-zinc-300"
                              }`}
                            />
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentSlide((s) =>
                              Math.min(slides.length - 1, s + 1)
                            )
                          }
                          disabled={currentSlide === slides.length - 1}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-80 border-l border-zinc-200 bg-white overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-medium text-zinc-500 mb-4 sticky top-0 bg-white">
                  {showNotesPanel ? "Speaker Notes" : "Upcoming Slides"}
                </h3>
                {isGenerating ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg border border-zinc-200"
                      >
                        <div className="w-2/3 h-4 bg-zinc-100 rounded mb-3" />
                        <div className="space-y-2">
                          <div className="w-full h-3 bg-zinc-100 rounded" />
                          <div className="w-4/5 h-3 bg-zinc-100 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : showNotesPanel ? (
                  <Textarea
                    className="min-h-[200px]"
                    placeholder="Add notes for this slide..."
                    value={slideNotes[slides[currentSlide]?.id] || ""}
                    onChange={(e) => {
                      if (slides[currentSlide]) {
                        setSlideNotes((prev) => ({
                          ...prev,
                          [slides[currentSlide].id]: e.target.value,
                        }));
                      }
                    }}
                  />
                ) : (
                  renderUpcomingSlides()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Theme Panel */}
      <Dialog open={showThemePanel} onOpenChange={setShowThemePanel}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Theme</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 p-4">
            {PRESENTATION_THEMES.map((theme) => (
              <div
                key={theme.id}
                className={`
                  aspect-video rounded-lg overflow-hidden cursor-pointer
                  border-2 transition-all
                  ${
                    selectedTheme === theme.id
                      ? "border-blue-500"
                      : "border-transparent"
                  }
                `}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className={`w-full h-full ${theme.background}`}>
                  <div className="p-4">
                    <h3 className={`text-lg font-medium ${theme.textColor}`}>
                      {theme.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      Presentation Mode
      {presentationMode && (
        <PresentationMode
          slides={slides}
          currentSlide={currentSlide}
          onExit={() => setPresentationMode(false)}
          theme={selectedTheme}
          participants={participants}
        />
      )}
      {/* <ParticipantsPanel
        isOpen={showParticipantsPanel}
        onClose={() => setShowParticipantsPanel(false)}
        presentationId={presentationId}
        participants={participants}
      /> */}
    </ClientOnly>
  );
}

// Add TypeScript types for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}
