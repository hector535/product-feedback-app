import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Modal, Select } from "@/components";
import { useGetCategories, useGetFeedbackForEdit, useGetStatus } from "@/hooks";
import { feedbackApi } from "@/api";
import { feedbackSchema } from "@/schemas";
import { EditFeedbackForm } from "@/types";
import { useStore } from "@/store";
import { FeedbackLayout } from "@/layout";

const FeedbackPage = () => {
  const { id } = useParams();
  const feedbackId = +id!;

  const feedback = useGetFeedbackForEdit(feedbackId);
  const categories = useGetCategories();
  const status = useGetStatus();

  const toggleElement = useStore((state) => state.toggleElement);
  const isDeleteFeedbackModalOpen = useStore(
    (state) => state.toggleableElements["delete-feedback"]
  );
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const navigateOnSuccess = {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      await queryClient.invalidateQueries({ queryKey: ["countByStatus"] });
      toggleElement("delete-feedback", false);
      navigate("/");
    },
  };

  const { mutate, isLoading } = useMutation(
    feedbackApi.edit,
    navigateOnSuccess
  );
  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    feedbackApi.remove,
    navigateOnSuccess
  );

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  const statusOptions = useMemo(
    () => status.map((s) => ({ value: s.id, label: s.name })),
    [categories]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditFeedbackForm>({
    defaultValues: {
      title: feedback.title,
      content: feedback.content,
      status: {
        id: feedback.status.id,
      },
      category: {
        id: feedback.category.id,
      },
    },
    resolver: zodResolver(feedbackSchema.editForm),
  });

  const onSubmit: SubmitHandler<EditFeedbackForm> = (data) =>
    mutate({ id: feedbackId, feedback: data });

  return (
    <FeedbackLayout title={`Editing: ${feedback.title}`} mode="edit">
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
            defaultValue={feedback.category.id}
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
          label="Update Status"
          description="Change feature state"
          name="status"
          errorMessage={errors.status?.id?.message}
        >
          <Controller
            control={control}
            name="status.id"
            defaultValue={feedback.status.id}
            render={({ field: { value, onChange } }) => (
              <Select
                options={statusOptions}
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
          <Button
            color="purple"
            disabled={isLoading || removeLoading}
            loading={isLoading}
          >
            Save Changes
          </Button>
          <Button
            type="button"
            color="dark-blue"
            disabled={isLoading || removeLoading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="red"
            className="md:mr-auto"
            disabled={isLoading || removeLoading}
            loading={removeLoading}
            onClick={() => toggleElement("delete-feedback", true)}
          >
            Delete
          </Button>
        </div>
      </Form>
      <Modal
        isOpen={isDeleteFeedbackModalOpen}
        onOutsideClick={() => toggleElement("delete-feedback", false)}
      >
        <h1 className="mb-4 text-xl font-bold">Delete confirmation</h1>
        <p className="mb-6">
          You are about to delete the feedback{" "}
          <span className="font-bold">#{feedbackId}</span>
        </p>

        <div className="flex justify-end gap-4">
          <Button
            color="dark-blue"
            onClick={() => toggleElement("delete-feedback", false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              toggleElement("delete-feedback", true);
              removeMutate(feedbackId);
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </FeedbackLayout>
  );
};

export default FeedbackPage;
