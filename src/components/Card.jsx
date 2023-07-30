import Link from 'next/link';

import '../styles/Card.css';

export default function Card({ post }) {
    const created_at = new Date(post.created_at);
    const date = created_at.getDate();
    const month = created_at.getMonth();
    const year = created_at.getFullYear();
    return (
        <div>
            <div className="card">
                <div className="top" style={{ background: `url(${post.urls.full}) no-repeat center center/cover` }}>
                    <div className="text">
                        <div className="name-wrapper">
                            <div className="name">
                                <Link href={`/user/${post.user.username}`}>
                                    <p className=''>{post.user.username}</p>
                                </Link>
                            </div>
                            <i className="material-icons">check_circle</i>
                        </div>
                        <div className="title">{post.user.name}</div>
                    </div>
                    <button className="like">
                        <div className="hexagon"><i className="material-icons">favorite</i></div>
                    </button>
                </div>
                <div className="bottom">
                    <div className="desc">{post.description ? post.description : post.alt_description}</div>
                    <div className="buttons">
                        <button className="date"><i className="material-icons">calendar_today</i>
                            <div className="height">{`${date}-${month}-${year}`}</div>
                        </button>
                        <button className="likes"><i className="material-icons">favorite</i>
                            <div className="height">{post.likes}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}