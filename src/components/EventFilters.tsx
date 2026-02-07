import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, PartyPopper, Theater, Trophy, Presentation, Laugh, X } from "lucide-react";
import { EventCategory, categories } from "@/data/events";

interface EventFiltersProps {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedCategory: EventCategory | null;
  setSelectedCategory: (category: EventCategory | null) => void;
  selectedPrice: string | null;
  setSelectedPrice: (price: string | null) => void;
}

const dateFilters = [
  { value: "today", label: "Hoje" },
  { value: "weekend", label: "Final de semana" },
  { value: "month", label: "Este mês" }
];

const priceFilters = [
  { value: "free", label: "Gratuito" },
  { value: "0-50", label: "Até R$50" },
  { value: "50-100", label: "R$50 - R$100" },
  { value: "100+", label: "Acima de R$100" }
];

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  show: <Music className="w-4 h-4" />,
  party: <PartyPopper className="w-4 h-4" />,
  theater: <Theater className="w-4 h-4" />,
  sports: <Trophy className="w-4 h-4" />,
  conference: <Presentation className="w-4 h-4" />,
  comedy: <Laugh className="w-4 h-4" />
};

export const EventFilters = ({
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice
}: EventFiltersProps) => {
  const hasFilters = selectedDate || selectedCategory || selectedPrice;

  const clearAllFilters = () => {
    setSelectedDate(null);
    setSelectedCategory(null);
    setSelectedPrice(null);
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Filtrar eventos</h2>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-2">
            <X className="w-4 h-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Date Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Data
          </div>
          <div className="flex flex-wrap gap-2">
            {dateFilters.map((filter) => (
              <Badge
                key={filter.value}
                variant={selectedDate === filter.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5"
                onClick={() => setSelectedDate(selectedDate === filter.value ? null : filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">
            Categoria
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5 gap-1.5"
                onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
              >
                {categoryIcons[cat.value]}
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Filters */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">
            Preço
          </div>
          <div className="flex flex-wrap gap-2">
            {priceFilters.map((filter) => (
              <Badge
                key={filter.value}
                variant={selectedPrice === filter.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5"
                onClick={() => setSelectedPrice(selectedPrice === filter.value ? null : filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
