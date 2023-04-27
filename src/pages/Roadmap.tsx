import { useMemo, useState } from "react";
import { Button, Icon, RoadmapSection, Tabs, Toolbar } from "@/components";
import { useGetFeedbacks } from "@/hooks";
import { useNavigate } from "react-router-dom";

const roadmapSectionClassname = "py-6 pl-6 pr-[0.875rem]";

const RoadmapPage = () => {
  const { data } = useGetFeedbacks({
    limit: 100,
    offset: 0,
    status: "all",
    key: "all",
  });

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");

  const feedbacksFilteredByPlanned = useMemo(
    () => data.filter((d) => d.status.name === "planned"),
    [data]
  );

  const feedbacksFilteredByInProgress = useMemo(
    () => data.filter((d) => d.status.name === "in-progress"),
    [data]
  );

  const feedbacksFilteredByLive = useMemo(
    () => data.filter((d) => d.status.name === "live"),
    [data]
  );

  const items = [
    {
      key: "1",
      label: `Planned (${feedbacksFilteredByPlanned.length})`,
      children: (
        <RoadmapSection
          className={roadmapSectionClassname}
          title="Planned"
          description="Ideas prioritized for research"
          feedbacks={feedbacksFilteredByPlanned}
        />
      ),
    },
    {
      key: "2",
      label: `In-progress (${feedbacksFilteredByInProgress.length})`,
      children: (
        <RoadmapSection
          className={roadmapSectionClassname}
          title="In-Progress"
          description="Currently being developed"
          feedbacks={feedbacksFilteredByInProgress}
        />
      ),
    },
    {
      key: "3",
      label: `Live ${feedbacksFilteredByLive.length}`,
      children: (
        <RoadmapSection
          className={roadmapSectionClassname}
          title="Live"
          description="Released features"
          feedbacks={feedbacksFilteredByLive}
        />
      ),
    },
  ];

  return (
    <div className="grid h-screen max-w-[69.375rem] grid-rows-[auto_1fr] md:mx-auto md:w-[90%] md:py-10">
      <header>
        <Toolbar className="flex items-center justify-between py-6 md:mb-8 md:rounded-lg-2 md:py-7">
          <div>
            <Button.Link
              className="mb-1 text-xs-2 text-white md:mb-2 md:text-sm"
              icon={<Icon name="arrow-left" className="stroke-white" />}
              onClick={() => navigate("/")}
            >
              Go back
            </Button.Link>
            <h1 className="text-lg font-bold text-white md:text-2xl">
              Roadmap
            </h1>
          </div>
          <Button color="purple" onClick={() => navigate("/feedback")}>
            + Add Feedback
          </Button>
        </Toolbar>
      </header>
      <main>
        <Tabs
          activeKey={activeTab}
          items={items}
          onChangeTab={setActiveTab}
          className="h-full md:hidden"
        />
        <div className="hidden h-full md:grid md:grid-cols-3 md:gap-3">
          <RoadmapSection
            title="Planned"
            description="Ideas prioritized for research"
            feedbacks={feedbacksFilteredByPlanned}
          />

          <RoadmapSection
            title="In-Progress"
            description="Currently being developed"
            feedbacks={feedbacksFilteredByInProgress}
          />

          <RoadmapSection
            title="Live"
            description="Released features"
            feedbacks={feedbacksFilteredByLive}
          />
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;
