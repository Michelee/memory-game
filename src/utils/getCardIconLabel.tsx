import { AcademicCapIcon } from "@/components/Icons/AcademicCapIcon";
import { BellIcon } from "@/components/Icons/BellIcon";
import { BoltIcon } from "@/components/Icons/BoltIcon";
import { BugIcon } from "@/components/Icons/BugIcon";
import { CakeIcon } from "@/components/Icons/CakeIcon";
import { CalculatorIcon } from "@/components/Icons/CalculatorIcon";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import { HomeIcon } from "@/components/Icons/HomeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { MoonIcon } from "@/components/Icons/MoonIcon";
import { MusicIcon } from "@/components/Icons/MusicIcon";
import { PencilIcon } from "@/components/Icons/PencilIcon";
import { PhotoIcon } from "@/components/Icons/PhotoIcon";
import { PuzzleIcon } from "@/components/Icons/PuzzleIcon";
import { ScissorsIcon } from "@/components/Icons/ScissorsIcon";
import { ShoppingCartIcon } from "@/components/Icons/ShoppingCartIcon";
import { SunIcon } from "@/components/Icons/SunIcon";
import { TrophyIcon } from "@/components/Icons/TrophyIcon";

export const getCardIconLabel = (label: string) => {
  switch (label) {
    case "moon":
      return <MoonIcon />;
    case "sun":
      return <SunIcon />;
    case "lock-closed":
      return <LockIcon />;
    case "home":
      return <HomeIcon />;
    case "musical-note":
      return <MusicIcon />;
    case "photo":
      return <PhotoIcon />;
    case "puzzle-piece":
      return <PuzzleIcon />;
    case "scissors":
      return <ScissorsIcon />;
    case "bolt":
      return <BoltIcon />;
    case "bell":
      return <BellIcon />;
    case "bug-ant":
      return <BugIcon />;
    case "cake":
      return <CakeIcon />;
    case "calculator":
      return <CalculatorIcon />;
    case "clock":
      return <ClockIcon />;
    case "shopping-cart":
      return <ShoppingCartIcon />;
    case "pencil":
      return <PencilIcon />;
    case "trophy":
      return <TrophyIcon />;
    case "academic-cap":
      return <AcademicCapIcon />;
    default:
      return label;
  }
};
