import axios from 'axios';

const CommentActions = ({ onClose, commentId, onEdit , getAllComment }) => {
  const handleDeleteComment = async () => {
    const check = confirm('are you sure ?');
    try {
      if (check) {
        if (commentId) {
          const deleteCmt = await axios.delete(`/api/comments/c/${commentId}`);

          if (deleteCmt.data.success){
              getAllComment()
            onClose()
        }
        }
      } else {
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openUpdatemenu = async () => {
    onEdit();
  };

  return (
    <>
      <div className="relative text-center">
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={openUpdatemenu}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentActions;
