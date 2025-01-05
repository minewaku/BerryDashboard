import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { useModal, useForm } from '~/hooks';
import * as postService from '~/services';

const { post, put, del } = postService;

const Create = ({ loading }) => {
   const { modal, closeModal, openModal } = useModal();
   const { details, setDetails, handleChange, handleSubmit } = useForm({
      userId: null,
      title: '',
      body: '',
   });

   return (
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={closeModal} closeAfterTransition>
         <Box className="absolute left-[50%] top-[50%] flex w-[520px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg bg-skin-base">
            <form onSubmit={(e) => handleSubmit(e, post)} className="flex w-full flex-col p-4">
               <div className="pb-3 pt-2">
                  <span className="text-xl font-bold">Create</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="w-full pb-4">
                     <TextField id="userId" label="UserId" name="userId" onChange={handleChange} multiline variant="filled" fullWidth />
                  </div>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="w-full pb-4">
                     <TextField id="title" label="Title" name="title" onChange={handleChange} multiline variant="filled" fullWidth />
                  </div>

                  <div className="w-full">
                     <TextField id="body" label="Body" name="body" onChange={handleChange} multiline rows={4} variant="filled" fullWidth />
                  </div>
               </div>

               <div className="flex items-center justify-center pt-10">
                  <button type="submit" className="rounded-md bg-skin-primary-inverted px-7 py-1 text-lg text-skin-base hover:opacity-80">
                     Save
                  </button>
               </div>
            </form>
         </Box>
      </Modal>
   );
};

const Edit = ({ data }) => {
   const { modal, closeModal, openModal } = useModal();
   const { details, setDetails, handleChange, handleSubmit } = useForm({
      userId: data.userId,
      id: data.id,
      title: data.title,
      body: data.body,
   });

   return (
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={closeModal} closeAfterTransition>
         <Box className="absolute left-[50%] top-[50%] flex w-[520px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg bg-skin-base">
            <form onSubmit={(e) => handleSubmit(e, put)} className="flex w-full flex-col p-4">
               <div className="pb-3 pt-2">
                  <span className="text-xl font-bold">Edit</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="flex w-full space-x-4 pb-4">
                     <TextField disabled id="id" label="ID" name="id" defaultValue={data.id} variant="filled" fullWidth />

                     <TextField disabled id="userId" label="User Id" name="userId" onChange={handleChange} defaultValue={data.userId} variant="filled" fullWidth />
                  </div>

                  <div className="w-full pb-4">
                     <TextField id="title" label="Title" name="title" onChange={handleChange} multiline defaultValue={data.title} variant="filled" fullWidth />
                  </div>

                  <div className="w-full">
                     <TextField id="body" label="Body" name="body" onChange={handleChange} multiline rows={4} defaultValue={data.body} variant="filled" fullWidth />
                  </div>
               </div>

               <div className="flex items-center justify-center pt-10">
                  <button type="submit" className="rounded-md bg-skin-primary-inverted px-7 py-1 text-lg text-skin-base hover:opacity-80">
                     Save
                  </button>
               </div>
            </form>
         </Box>
      </Modal>
   );
};

const Delete = ({ ids }) => {
   const { modal, closeModal, openModal } = useModal();
   const { details, setDetails, handleChange, handleSubmit } = useForm(ids);

   return (
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => closeModal()} closeAfterTransition>
         <Box className="absolute left-[50%] top-[50%] flex w-[520px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg bg-skin-base">
            <form onSubmit={(e) => handleSubmit(e, del)} className="flex w-full flex-col p-4">
               <div className="pb-3 pt-2">
                  <span className="text-lg font-bold">Post</span>
               </div>

               <span className="text-center text-lg font-bold">Are you sure you want to delete {ids.join(', ')}?</span>

               <div className="flex items-center justify-center pt-10">
                  <button className="rounded-md bg-skin-primary-inverted px-7 py-1 text-lg text-skin-base hover:opacity-80">Ok</button>
               </div>
            </form>
         </Box>
      </Modal>
   );
};

export default { Create, Edit, Delete };
