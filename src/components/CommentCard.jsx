import { useEffect, useRef, useState } from 'react';
import CommentActions from './CommentActions';
import { Heart, MoreVertical } from 'lucide-react';
import axios from 'axios';

const CommentCard = ({ cmt, getAllComment }) => {
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newContent, setNewContent] = useState(cmt.content);
  const [likeComment, setLikeComment] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const updateComment = async () => {
    const res = await axios.patch(`/api/comments/c/${cmt._id}`, {
      content: newContent,
    });

    if (res.data.success) {
      setOption(false);
      setIsEdit(false);
      getAllComment();
    }
  };

  const handleCancelUpdate = () => {
    setIsEdit(false);
    setOption(false);
    setNewContent(cmt.content);
  };

  const handleCommentLike = async () => {
    try {
      const res = await axios.post(`/api/likes/toggle/c/${cmt._id}`);
      setLikeComment(Object.keys(res.data.data).length > 0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative bg-gray-50 p-4 rounded-lg shadow-md transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* Left: Comment content or input */}
        <div className="flex-1">
          {isEdit ? (
            <div>
              <input
                ref={inputRef}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={updateComment}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelUpdate}
                  className="text-sm px-3 py-1 border rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800 text-sm">{cmt.content}</p>
          )}
        </div>

        {/* Right: Like & More icon */}
        <div className="flex items-center gap-3 ml-4">
          <button
            className={`hover:text-red-500 transition`}
            onClick={handleCommentLike}
            title="Like"
          >
            <Heart
              size={18}
              className={`${likeComment ? 'fill-red-500 text-red-500' : ''}`}
            />
          </button>
          <button
            className="hover:text-gray-700"
            onClick={() => setOption((prev) => !prev)}
            title="Options"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {option && (
        <div className="absolute top-10 right-4 z-50">
          <CommentActions
            commentId={cmt._id}
            onClose={() => setOption(false)}
            onEdit={() => setIsEdit(true)}
            getAllComment={getAllComment}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
