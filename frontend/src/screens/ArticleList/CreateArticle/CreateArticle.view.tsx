import { CMSCKEditor } from "~/components/common";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import useCreateArticle from "./CreateArticle.hook";
import { Form, FormField, FormMessage } from "~/components/ui/form";
import UploadComponent from "~/components/common/CMSUploadMedia/UploadComponent/UploadComponent.view";
import { ICreateArticle } from "./CreateArticle.props";

const CreateArticle = (props: ICreateArticle) => {
  const { form, onSubmit, isLoadingCreate } = useCreateArticle({
    IdRowTarget: props.IdRowTarget,
    onCloseModal: props.onCloseModal,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="w-full min-h-full relative flex flex-col justify-between "
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full gap-y-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="Enter title" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Thumbnail</Label>
              <div className="relative mb-[70px]">
                <UploadComponent
                  accept="image"
                  onChangeFile={(file) => {
                    form.setValue("files", file);
                    form.clearErrors("files");
                  }}
                  onRemoveFile={() => {
                    form.setValue("files", undefined);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Content</Label>
              <FormField
                name="content"
                control={form.control}
                render={() => (
                  <div className="w-full">
                    <CMSCKEditor
                      onChange={(value) => {
                        form.setValue("content", value);
                        form.clearErrors("content");
                      }}
                    />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 actionBottomDrawer">
          <Button variant={"outline"} className="w-full" isLoading={isLoadingCreate} disabled={isLoadingCreate}>
            Cancel
          </Button>
          <Button className="w-full" isLoading={isLoadingCreate} disabled={isLoadingCreate}>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateArticle;
