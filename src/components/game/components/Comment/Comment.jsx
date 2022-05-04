import React, { useState, useEffect, createElement } from 'react'
import { Comment as CommentAntd, List, Form, Input, Avatar, Button } from 'antd'
import { getCommentList, addCommentService } from '../../../../service/comment';
import moment from 'moment';
import './Comment.scss'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

const { TextArea } = Input;

const Comment = () => {
    const [form] = Form.useForm();
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);
    const [commentList, setCommentList] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [comment, setComment] = useState('')

    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    const getComment = async () => {
        const result = await getCommentList({
            GID: 1,
            num: 2,
        })
        console.log(result.List)
        setCommentList(result.List)
    }

    useEffect(() => {
        getComment()
    }, [])

    const data = commentList.map(e =>
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
                <Avatar className='avatar' src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />

                <Form.Item name="textarea" className='textarea-wrapper'>
                    <TextArea className='textarea' onChange={onChange} />
                </Form.Item>
                <Form.Item className='submit-btn'>
                    <Button htmlType="submit" loading={submitting} type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </div>


        </>
    );

    const handleChange = (e) => {
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        console.log(comment)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        if (!values.textarea) {
            return;
        }
        setSubmitting(true)
        const addComment = async () => {
            const result = await addCommentService({
                game_id: 1,
                comment: values.textarea,
            })
            if (result.status == 200) {
                setSubmitting(false)
                getComment()
            }
        }
        addComment()
    };


    return (
        <div className='comment'>
            <div>{`${data.length} comments`}</div>
            <Form
                onFinish={onFinish}
            // layout="inline"
            >
                <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                />
            </Form>
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
