import { useState, useTransition } from "react";

export function useActiveCategory<T extends string>(initialCategory: T) {
  const [activeCategory, setActiveCategory] = useState<T>(initialCategory);
  const [isPending, startTransition] = useTransition();

  const changeCategory = (category: T) => {
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  return {
    activeCategory,
    setActiveCategory: changeCategory,
    isPending,
  };
}
