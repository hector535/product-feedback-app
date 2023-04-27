import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Select } from "@/components";
import { useGetCategories } from "@/hooks";
import { feedbackApi } from "@/api";
import { NewFeedbackForm } from "@/types";
import { feedbackSchema } from "@/schemas";
import { FeedbackLayout } from "@/layout";

const FeedbackPage = () => {
  const categories = useGetCategories();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(feedbackApi.add, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["feedbacks", "suggestions"],
        exact: true,
      });
      navigate("/");
    },
  });

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewFeedbackForm>({
    resolver: zodResolver(feedbackSchema.newForm),
  });

  const onSubmit: SubmitHandler<NewFeedbackForm> = (data) => mutate(data);

  return (
    <FeedbackLayout title="Create New Feedback" mode="new">
      <Form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Form.Item
          label="Feedback Title"
          description="Add a short, descriptive headline"
          name="title"
          errorMessage={errors.title?.message}
        >
          <input type="text" className="input" {...register("title")} />
        </Form.Item>

        <Form.Item
          label="Category"
          description="Choose a category for your feedback"
          name="category"
          errorMessage={errors.category?.id?.message}
        >
          <Controller
            control={control}
            name="category.id"
            render={({ field: { value, onChange } }) => (
              <Select
                options={categoryOptions}
                placeholder="Select an option"
                value={value}
                onChange={(selectedValue) => onChange(selectedValue)}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added,
            etc."
          name="detail"
          errorMessage={errors.content?.message}
        >
          <textarea className="input h-28" {...register("content")}></textarea>
        </Form.Item>

        <div className="mt-4 grid gap-4 md:flex md:flex-row-reverse">
          <Button color="purple" loading={isLoading} disabled={isLoading}>
            Add Feedback
          </Button>
          <Button
            type="button"
            color="dark-blue"
            disabled={isLoading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </FeedbackLayout>
  );
};

export default FeedbackPage;
