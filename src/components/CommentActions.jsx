import axios from 'axios';

const CommentActions = ({ onClose, commentId, onEdit, getAllComment }) => {
  const handleDeleteComment = async () => {
    const check = confirm('are you sure ?');
    try {
      if (check) {
        if (commentId) {
          const deleteCmt = await axios.delete(`/api/comments/c/${commentId}`);

          if (deleteCmt.data.success) {
            getAllComment();
            onClose();
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
      <div className="transition-all duration-200 ease-out scale-100 origin-top-right">
        <div className="w-32 bg-white border rounded-lg shadow-lg">
          <button
            onClick={openUpdatemenu}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDeleteComment}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentActions;
