import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/ImageGrid.module.css';

export const ImageGrid = ({ pageData, lastElementRef }) => {
   return (
      <main>
         <div className={styles.container}>
            {pageData?.map((post, index) => (
               <div className={styles.post}
                  key={post?.id}
                  ref={pageData.length === index + 1 ? lastElementRef : null}
               >
                  <div className={styles.user_info}>
                     <div className={styles.user_image}>
                        <Image
                           className={styles.user_image}
                           src={post.user.profile_image.small}
                           width={50}
                           height={50}
                           alt=''
                        />
                     </div>
                     <Link href={`/user/${post.user.username}`}>
                        <p className=''>{post.user.username}</p>
                     </Link>
                  </div>
                  <div>
                     <Image
                        src={post.urls.regular}
                        alt={post.alt_description}
                        width={400}
                        height={400}
                     />
                     <p className={styles.post_likes}>likes = {post.likes}</p>
                     <p className=''>{post.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </main>
   );
};
