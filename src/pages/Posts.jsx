import { DataTable } from "~/components/Table";
import { TABLE_HEADERS } from "~/store/constants";
import { PostModal } from "~/components/Modal";
import { SIZE_OPTIONS_1 } from "~/store/constants";
import * as postService from "~/services";

const Posts = () => {
  return (
    <DataTable
      headers={TABLE_HEADERS.POSTS}
      modals={PostModal}
      sizeOptions={SIZE_OPTIONS_1}
      apiServices={postService}
    ></DataTable>
  );
};

export default Posts;
