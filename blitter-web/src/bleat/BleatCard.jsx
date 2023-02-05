import axios from '../utils/axios';
import { Menu, Transition } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function BleatImage({ bleato }) {
  if (bleato.image) {
    return (
      <img
        className='mt-2 rounded-2xl border border-gray-100 dark:border-gray-700'
        src='https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium'
        alt='Bleat Image'
      />
    );
  } else {
    return <></>;
  }
}

export default function BleatCard({ bleat, setBleats, isBleatView }) {
  const getHumanReadableDate = (date) => {
    const _date = new Date(date);
    return _date.toDateString();
  };

  const navigate = useNavigate();
  const [replyCount, setReplyCount] = useState(bleat.replyCount);
  const [likeCount, setLikeCount] = useState(bleat.likeCount);
  const [authorLiked, setAuthorLiked] = useState(bleat.authorLiked);
  const [editMode, setEditMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);

  const handleDelete = async (event) => {
    try {
      event.preventDefault();
      const response = await axios({
        method: 'delete',
        url: '/bleats/' + bleat.id,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
        },
      });
      setBleats((prevBleats) => prevBleats.filter((bl) => bl.id !== bleat.id));
      if (isBleatView) navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (event) => {
    setEditMode(!editMode);
  };
  const toggleComment = async (event) => {
    setCommentMode(!commentMode);
  };

  function BleatView() {
    return (
      <div>
        <p className='mt-3 block text-xl leading-snug text-black dark:text-white'>
          {bleat.message}
        </p>
        <BleatImage bleato={bleat} />
        <p className='my-0.5 py-1 text-base text-gray-500 dark:text-gray-400'>
          {getHumanReadableDate(bleat.createdDate)}
        </p>
      </div>
    );
  }

  function EditView() {
    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const response = await axios({
          method: 'put',
          url: '/bleats/' + bleat.id,
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          },
          data: {
            message: formJson.editContents,
          },
        });

        if (response.status === 200) {
          setEditMode(!editMode);
          setBleats((prevBleats) => {
            const updatedList = prevBleats.map((item) => {
              if (item.id === bleat.id) {
                return response.data;
              }
              return item;
            });

            return updatedList;
          });

          event.target.reset();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <form
        className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800'
        onSubmit={handleSubmit}>
        <div className='mb-2 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'>
          <div className='flex items-center justify-between border-b px-3 py-2 dark:border-gray-600'>
            <button
              type='button'
              className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'>
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='sr-only'>Upload image</span>
            </button>
          </div>
          <div className='rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800'>
            <label htmlFor='bleatEditor' className='sr-only'>
              Publish post
            </label>
            <textarea
              id='bleatEditor'
              name='editContents'
              rows='8'
              className='block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
              defaultValue={bleat.message}
              required></textarea>
          </div>
        </div>
        <button
          type='submit'
          className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'>
          Publish post
        </button>
        <button
          className='mx-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-red-900 hover:bg-red-800'
          onClick={handleEdit}>
          Cancel
        </button>
      </form>
    );
  }

  function CommentView() {
    const postComment = async (event) => {
      try {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const response = await axios({
          method: 'post',
          url: '/bleats/' + bleat.id + '/reply',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          },
          data: {
            message: formJson.replyContents,
          },
        });

        if (response.status === 200) {
          event.target.reset();
          setReplyCount((replyCount) => replyCount + 1);
          setBleats((prevBleats) => [response.data, ...prevBleats]);
          toggleComment();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <form className='mb-6' onSubmit={postComment}>
        <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <label htmlFor='replyContents' className='sr-only'>
            Your comment
          </label>
          <textarea
            id='replyContents'
            rows='6'
            name='replyContents'
            className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
            placeholder='Write a reply...'></textarea>
        </div>
        <button
          className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
          type='submit'>
          Post comment
        </button>
        <button
          className='mx-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-red-900 hover:bg-red-800'
          onClick={toggleComment}>
          Cancel
        </button>
      </form>
    );
  }

  function InfoView() {
    return (
      <div className='mt-3 flex text-gray-500 dark:text-gray-400'>
        <button className='mr-6 flex items-center ' onClick={toggleLike}>
          <HeartIcon
            className={`h-5 w-5 hover:fill-red-700 hover:stroke-red-700 ${
              authorLiked ? 'fill-red-700 stroke-red-700' : ''
            } `}
          />
          <span className='ml-3'>{likeCount}</span>
        </button>
        <button
          className='mr-6 flex items-center dark:hover:bg-gray-700 rounded-lg p-1.5'
          onClick={toggleComment}>
          <ChatBubbleLeftIcon className='h-5 w-5' />
          <span className='ml-3'>{replyCount} Comments</span>
        </button>
        {isBleatView ? (
          <></>
        ) : (
          <Link to={`/bleat/${bleat.id}`}>
            <button className='mr-6 flex items-center dark:hover:bg-gray-700 rounded-lg p-1.5'>
              <ArrowTopRightOnSquareIcon className='h-5 w-5' />
            </button>
          </Link>
        )}
      </div>
    );
  }

  const toggleLike = async (event) => {
    try {
      event.preventDefault();
      setAuthorLiked(!authorLiked);
      const response = await axios({
        method: 'post',
        url: '/bleats/' + bleat.id + '/toggleLike',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
        },
      });
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' items-center justify-center bg-gray-50 p-4 dark:bg-black'>
      <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <img
              className='h-11 w-11 rounded-full'
              src='https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg'
            />
            <div className='ml-1.5 text-sm leading-tight'>
              <span className='block font-bold text-black dark:text-white '>
                {bleat.author_name}
              </span>
              <Link to={`/users/${bleat.author_username}`}>
                <span className='block font-normal text-gray-500 dark:text-gray-400 hover:underline '>
                  @{bleat.author_username}
                </span>
              </Link>
            </div>
          </div>
          <div className='flex justify-end px-4 pt-4'>
            <Menu as='div' className='relative ml-3'>
              <Menu.Button className='inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'>
                <span className='sr-only'>Open dropdown</span>
                <svg
                  className='h-6 w-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
                </svg>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-gray-50'>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          'block cursor-pointer px-4 py-2 text-sm',
                          active ? ' bg-gray-900 text-gray-50' : ''
                        )}
                        onClick={handleEdit}>
                        Edit
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          'block cursor-pointer px-4 py-2 text-sm',
                          active ? 'bg-red-600 text-gray-50 ' : ''
                        )}
                        onClick={handleDelete}>
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item disabled>
                    {({ active }) => (
                      <div
                        className={classNames(
                          'block px-4 py-2 text-sm',
                          active ? ' bg-gray-400 text-gray-700' : ''
                        )}>
                        Coming Soon
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {editMode ? <EditView /> : <BleatView />}
        <div className='my-1 border border-b-0 border-gray-200 dark:border-gray-600'></div>
        {commentMode ? <CommentView /> : <InfoView />}
      </div>
    </div>
  );
}
