import React, { useState, useEffect, createElement } from 'react'
import { Comment as CommentAntd, List, Form, Input, Avatar } from 'antd'
import { getCommentList } from '../../../../service/comment';
import moment from 'moment';
import './Comment.scss'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

const { TextArea } = Input;

const Comment = () => {
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);
    const [commentList, setCommentList] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [comment, setComment] = useState('')

    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    useEffect(() => {
        const getComment = async () => {
            const result = await getCommentList({
                GID: 1,
                num: 2,
            })
            console.log(result.List)
            setCommentList(result.List)
        }
        getComment()
    }, [])

    let data = commentList.map(e =>
    ({
        actions: [
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
            ,
            <span key="comment-list-reply-to-0">Reply to</span>,
        ],
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
            <p>
                {e.comment}
            </p>
        ),
        datetime: (
            <span>{e.create_time.split(' ')[0]}</span>
        ),
    })
    )


    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>

            <div className='editor'>
                <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                <TextArea className='textarea' onChange={onChange} />

                <button className='submit-btn' htmlType="submit" loading={submitting} onClick={onSubmit}>
                    Add Comment
                </button>
            </div>


        </>
    );

    const handleChange = (e) => {
        console.log(e.target.value)
    }
    const handleSubmit = () => {
    }




    return (
        <div className='comment'>
            <div>{`${data.length} comments`}</div>
            <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={comment}
            />
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <li>
                        <CommentAntd
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        </div>
    )
}

export default Comment
