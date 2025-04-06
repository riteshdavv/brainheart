import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  secondaryIcon?: LucideIcon;
  title: string;
  description: string;
}

export function Feature({
  icon: Icon,
  secondaryIcon: SecondaryIcon,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="group flex flex-col justify-center items-center space-y-6 rounded-xl border border-gray-200 dark:border-gray-600 bg-background p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#FF5C35]/50 hover:-translate-y-1 min-h-[320px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5C35]/10 transition-colors group-hover:bg-[#FF5C35]/20">
        {SecondaryIcon ? (
          <div className="flex items-center gap-1">
            <Icon className="h-8 w-8 text-[#FF5C35]" />
            <SecondaryIcon className="h-8 w-8 text-accent" />
          </div>
        ) : (
          <Icon className="h-8 w-8 text-[#FF5C35]" />
        )}
      </div>
      <div className="space-y-4 text-center">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
