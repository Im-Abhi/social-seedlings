import Card from './Card';

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
                  <Card post={post} />
               </div>
            ))}
         </div>
      </main>
   );
};
