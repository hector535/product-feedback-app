import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { useStore } from "@/store";
import { useGetFeedbacks } from "@/hooks";
import { Gradient, Roadmap } from "@/containers";
import {
  Button,
  Icon,
  Dropdown,
  Toolbar,
  Drawer,
  Suggestion,
  EmptyFeedbackMessage,
  Paper,
  CategoryList,
  WelcomeLogout,
} from "@/components";

import upvoteCommentOptions from "@/data/upvote-comment-filter-options.json";

const HomePage = () => {
  const { data: suggestions } = useGetFeedbacks({
    limit: 500,
    offset: 0,
    status: "suggestion",
    key: "suggestions",
  });

  const navigate = useNavigate();

  const [selectedDropdownOption, setSelectedDropdownOption] = useState<
    number | string
  >(1);

  const dropdownOption = upvoteCommentOptions.find(
    (o) => o.value === selectedDropdownOption
  );

  const [selectedCategory, setSelectedCategory] = useState<number | string>(0);

  const isDrawerOpen = useStore((state) => state.toggleableElements.drawer);
  const toggleElement = useStore((state) => state.toggleElement);

  let filteredSuggestions = useMemo(() => {
    return selectedCategory === 0
      ? suggestions
      : suggestions.filter((s) => s.category.id === selectedCategory);
  }, [selectedCategory, suggestions]);

  filteredSuggestions = sortFeedbacksBy(
    filteredSuggestions,
    dropdownOption!.label
  );

  return (
    <div className="grid h-screen max-w-[73.75rem] grid-rows-[auto_1fr] md:grid-rows-[auto_auto_1fr] md:gap-10 md:px-10 md:pt-14 lg:mx-auto lg:grid-cols-[15.9375rem_minmax(0,_1fr)] lg:grid-rows-[min-content_auto] lg:gap-[1.875rem]">
      <WelcomeLogout className="hidden md:-mb-6 md:flex md:flex-wrap md:items-center md:justify-between lg:col-span-2 lg:col-start-1 lg:-mb-2" />
      <header className="md:grid md:grid-cols-3 md:grid-rows-[11.125rem] md:gap-3 lg:grid-cols-none lg:grid-rows-none lg:content-start lg:gap-6 ">
        <Gradient className="lg:h-[8.5625rem] " />
        <Paper className="hidden md:block">
          <CategoryList
            value={selectedCategory}
            onChange={(selectedValue) => setSelectedCategory(selectedValue)}
          />
        </Paper>

        <Roadmap className="hidden md:grid md:gap-6" />
      </header>
      <main className="grid grid-rows-[auto_1fr]">
        <Toolbar className="grid gap-2 text-secondary-325 xs:flex xs:items-center xs:justify-between md:justify-start md:gap-0 md:rounded-lg-2">
          <Icon name="suggestions" className="hidden md:mr-4 md:block" />
          <span className="hidden text-lg font-bold leading-[1.625rem] md:mr-8 md:block">
            {filteredSuggestions.length} Suggestions
          </span>

          <Dropdown
            className="justify-self-center md:flex-grow"
            options={upvoteCommentOptions}
            value={selectedDropdownOption}
            onChange={(selectedValue) =>
              setSelectedDropdownOption(selectedValue)
            }
          />
          <Button color="purple" onClick={() => navigate("/feedback")}>
            + Add Feedback
          </Button>
        </Toolbar>

        <div className="relative py-8 pl-6 pr-[0.875rem] md:py-6 md:px-0 ">
          {filteredSuggestions.length === 0 ? (
            <EmptyFeedbackMessage />
          ) : (
            <Virtuoso
              className="suggestion-list"
              data={filteredSuggestions}
              itemContent={(_, suggestion) => (
                <Suggestion
                  className="mb-4 last:mb-0"
                  feedback={suggestion}
                  onClick={() => navigate(`/feedback/details/${suggestion.id}`)}
                />
              )}
            />
          )}
        </div>
      </main>
      <Drawer
        className="grid content-start gap-6 p-6"
        isOpen={isDrawerOpen}
        onClose={() => toggleElement("drawer", false)}
      >
        <WelcomeLogout className="flex flex-wrap items-center justify-between" />
        <Paper>
          <CategoryList
            value={selectedCategory}
            onChange={(selectedValue) => setSelectedCategory(selectedValue)}
          />
        </Paper>
        <Roadmap className="grid gap-6" />
      </Drawer>
    </div>
  );
};

const sortFeedbacksBy = (
  feedbacks: ReturnType<typeof useGetFeedbacks>["data"],
  criteria: string
) => {
  if (criteria === "Most Upvotes") {
    return Object.entries(feedbacks)
      .sort(([, a], [, b]) => b.upvotes - a.upvotes)
      .map((s) => s[1]);
  }

  if (criteria === "Least Upvotes") {
    return Object.entries(feedbacks)
      .sort(([, a], [, b]) => a.upvotes - b.upvotes)
      .map((s) => s[1]);
  }

  if (criteria === "Most Comments") {
    return Object.entries(feedbacks)
      .sort(([, a], [, b]) => b.commentCounter - a.commentCounter)
      .map((s) => s[1]);
  }

  return Object.entries(feedbacks)
    .sort(([, a], [, b]) => a.commentCounter - b.commentCounter)
    .map((s) => s[1]);
};

export default HomePage;
