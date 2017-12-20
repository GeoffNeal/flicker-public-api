import React, { Component } from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';

// Components
import Photo from './Photo';

// Styles
import styles from '../styles/PhotoList.css';

class PhotoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    }

    this.getPhotos = this.getPhotos.bind(this);
    this.parseAuthor = this.parseAuthor.bind(this);
    this.parseDescription = this.parseDescription.bind(this);
    this.convertImageSourceToStyle = this.convertImageSourceToStyle.bind(this);
    this.clipText = this.clipText.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos() {
    /*
    * The flickr API does not support CORS so the fetch API will not work.
    * As a result I am using jQuery's getJSON method
    */
    const jsonFlickrFeed = json => {
      console.log(json);
      this.setState({ photos: json.items });
    };

    $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?', {
      format: 'json'
    }, jsonFlickrFeed);
  }

  parseAuthor(authorHTML) {
    /*
    * Get text from author HTML
    */
    let firstSliceIndex = authorHTML.indexOf("\"")+1;
    let lastSliceIndex = authorHTML.lastIndexOf("\"");
    let parsedAuthor = authorHTML.slice(firstSliceIndex, lastSliceIndex);
    return parsedAuthor;
  }

  parseDescription(description) {
    /*
    * The description part of the response is recieved as HTML text and
    * not all of it is relevant, so it must be filtered and parsed to
    * HTML before being passed to Photo component.
    *
    * Returns a string
    */

    const extractRelevantData = paragraphs => {
      /*
      * The actual description is being held in the third <p> tag. If
      * there are only 2 <p> tags then there is no description.
      */

      return paragraphs.length > 2 ? this.clipText(paragraphs[2].innerHTML) : 'No description';
    };

    // Array of HTML elements that are direct children of description
    const descriptionAsHTML = $.parseHTML(description);
    // Will contain only the <p> elements and no text nodes
    let paragraphElements = [];

    $.each(descriptionAsHTML, (i, el) => {
      // Filter out any textnodes so that there are only <p> elements
      if(el.nodeName !== '#text') {
        paragraphElements.push(el);
      }
    });

    return extractRelevantData(paragraphElements);
  }

  convertImageSourceToStyle(imageSource) {
    /*
    * Create a CSS property so that the image can be
    * applied as the background-image property of a div
    * rather than creating an <img/> element.
    */
    const bgImageStyle = { backgroundImage: `url(${imageSource}` };
    return bgImageStyle;
  }

  clipText(text) {
    /*
    * Shorten text that is longer than a certain length of
    * characters so as to avoid text overlap in confined
    * spaces.
    */
    $.each($.parseHTML(text), (i, el) => {
      if(el.nodeName === '#text') {
        let preferredTextLength = 70;
        if(el.length > preferredTextLength) {
          let clippedText = $(el).text().split('').splice(0, preferredTextLength).join('') + '...';
          text = clippedText;
        }
      }
    });
    return text;
  }

  render() {
    const photos = this.state.photos;

    return photos.length > 0 ? (
      <div>
        {photos.map((photo, index) => {
          const parsedAuthor = this.parseAuthor(photo.author);
          const image = this.convertImageSourceToStyle(photo.media.m);
          const parsedDescription = this.parseDescription(photo.description);
          const clippedTags = this.clipText(photo.tags);
          
          return <Photo
            key={photo.title.concat(index)}
            title={photo.title}
            author={parsedAuthor}
            authorId={photo.author_id}
            bgImage={image}
            photoLink={photo.link}
            description={parsedDescription}
            tags={clippedTags}
          />
        })}
      </div>
    ) : (
      <div className={styles.loading}>
        <h3>Loading...</h3>
        <p>Finding photos, please wait</p>
      </div>
    );
  }
}

export default PhotoList;
