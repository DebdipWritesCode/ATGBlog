import Post from "./Post"

const AllPosts = ({ posts, heading, mode }) => {
    if(posts.length === 0) {
        return (
            <div className="mt-12 font-inter mb-14">
                <h2 className="mb-8 text-2xl font-semibold ">{heading}</h2>
                <p className="text-lg">You haven't posted anything yet!</p>
            </div>
        )
    }

    return (
        <div className="mt-12 font-inter mb-14">
            <h2 className="mb-8 text-2xl font-semibold ">{heading}</h2>
            <div className="flex flex-wrap gap-8 justify-between">
                {
                    posts.map(({ _id, title, date, author, content, imageURL, topics }) => (
                        <Post key={_id} id={_id} title={title} date={date} author={author} content={content} imageURL={imageURL} topics={topics} mode={mode} />
                    ))
                }
            </div>
        </div>
    )
}

export default AllPosts