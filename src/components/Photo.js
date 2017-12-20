import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from '../styles/Photo.css';

const Photo = props => (
  <div className={styles.container} style={props.bgImage}>
    <a href={props.photoLink}>
      <div className={styles.overlay}>
        {props.description !== 'No description' && <div>
          <h4>Description:</h4>
          <p className={styles.description} dangerouslySetInnerHTML={{__html: props.description}}></p>
        </div>}
        {props.tags !== '' && props.tags !==' ' && <div>
          <h4>Tags:</h4>
          <p className={styles.tags}>{props.tags}</p>
        </div>}
        <div className={styles.imageDetails}>
          <p>
            <a className={styles.title} href={props.photoLink}>{props.title}</a>
            <br/>
            <span className={styles.textSeparator}>by</span>
            <a className={styles.author} href={`https://www.flickr.com/photos/${props.authorId}`}>{props.author}</a>
          </p>
        </div>
      </div>
    </a>
  </div>
);

Photo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  bgImage: PropTypes.object.isRequired,
  photoLink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
};

export default Photo;
