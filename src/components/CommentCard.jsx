import { useEffect, useRef, useState } from 'react';
import CommentActions from './CommentActions';
import { Heart, MoreVertical } from 'lucide-react';
import axios from 'axios';

const CommentCard = ({ cmt , getAllComment }) => {
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newContent, setNewContent] = useState(cmt.content);
  const inputRef = useRef(null);

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const updateComment = async () => {
    const upateCmt = await axios.patch(`/api/comments/c/${cmt._id}`, {
      content: newContent,
    });

    if (upateCmt.data.success) {
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
  return (
    <>
      <div key={cmt._id} className="flex gap-4 bg-white p-3 rounded-lg shadow">
        <div className="flex flex-col justify-between">
          <h3 className="font-medium text-gray-800">
            <div className="flex gap-7 justify-between">
              <button className="text-red-500 hover:text-red-600">
                <Heart size={18} />
              </button>
              {isEdit ? (
                <div className="mt-2">
                  <input
                    ref={inputRef}
                    className="font-medium text-gray-800 w-full border rounded px-2 py-1"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={updateComment}
                      className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelUpdate}
                      className="text-sm text-gray-700 px-3 py-1 border rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <h3 className="font-medium text-gray-800">{cmt.content}</h3>
              )}
              <button className="text-gray-500 hover:text-gray-700 cursor:pointer ">
                <MoreVertical size={15} onClick={() => setOption(true)} />
              </button>
            </div>
          </h3>
        </div>
      </div>

      {option && (
        <div>
          <CommentActions
            commentId={cmt._id}
            onClose={() => setOption(false)}
            onEdit={() => setIsEdit(true)}
            getAllComment = {getAllComment}
          />
        </div>
      )}
    </>
  );
};

export default CommentCard;
