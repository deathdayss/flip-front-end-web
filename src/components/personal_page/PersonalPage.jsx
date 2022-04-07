import React from 'react'
import { Avatar, } from 'antd'
import "./PersonalPage.scss"

const gameDetail = {
    creator: "Creator",
    title: "Title title title title title",
    play: "1000 plays",
    date: "2021-08-20 11:46:28",
    subscribers: "4513 subscribers",
    subscribe: "SUBSCRIBE",
    description: "A doc-style video to summarize early design and gameplay elements that were much more impressive compared to the final product. Infinite went through many revisions over the course of its development, Irrational Games had to scale back a lot of ideas, which was disappointing for a lot of people after the E3 showcases. Everything shown here has been removed or downgraded to the point where it's just not comparable. Self-explanatory quote from Ken Levine: \"we cut enough content to make 5-6 full games\". There's more in the official artbook if you're interrested.",
    comments: "2342 comments"
}

const PersonalPage = (props) => {
    return (
        <>
            <div class="personal-page-container">
                <div>
                    <a href="">
                        <Avatar src="images/header/header_avatar_btn.svg"></Avatar>
                    </a>

                </div>
                <div className='creator'>
                    <span style={{ fontSize: '14px', display: "block" }}>{gameDetail.creator}</span>
                </div>
            </div>
        </>
    )
}

export default PersonalPage