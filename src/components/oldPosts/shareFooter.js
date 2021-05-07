import React, { useEffect } from 'react';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from 'react-share';
import styles from './shareFooter.module.css';

export default function ShareFooter({ postData, shareUrl = 'https://bego.tips' }) {
  return (
    <div className={`${styles.shareMainContainer}`}>
      <div className={`${styles.shareContainer}`}>
        <FacebookShareButton
          url={shareUrl}
          quote={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="521270401588372"
          className={`${styles.shareContainerButton}`}
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TwitterShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TelegramShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WhatsappShareButton
          url={shareUrl}
          title={postData.title}
          separator=":: "
          className={`${styles.shareContainerButton}`}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LinkedinShareButton url={shareUrl} className={`${styles.shareContainerButton}`}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <PinterestShareButton
          url={shareUrl}
          media={`${postData.image}`}
          className={`${styles.shareContainerButton}`}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <VKShareButton
          url={shareUrl}
          image={`${postData.image}`}
          className={`${styles.shareContainerButton}`}
        >
          <VKIcon size={32} round />
        </VKShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <OKShareButton
          url={shareUrl}
          image={`${postData.image}`}
          className={`${styles.shareContainerButton}`}
        >
          <OKIcon size={32} round />
        </OKShareButton>

      </div>

      <div className={`${styles.shareContainer}`}>
        <RedditShareButton
          url={shareUrl}
          title={postData.title}
          windowWidth={660}
          windowHeight={460}
          className={`${styles.shareContainerButton}`}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TumblrShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TumblrIcon size={32} round />
        </TumblrShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LivejournalShareButton
          url={shareUrl}
          title={postData.title}
          description={shareUrl}
          className={`${styles.shareContainerButton}`}
        >
          <LivejournalIcon size={32} round />
        </LivejournalShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <MailruShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <MailruIcon size={32} round />
        </MailruShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <EmailShareButton
          url={shareUrl}
          subject={postData.title}
          body="body"
          className={`${styles.shareContainerButton}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
      <div className={`${styles.shareContainer}`}>
        <ViberShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <ViberIcon size={32} round />
        </ViberShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WorkplaceShareButton
          url={shareUrl}
          quote={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <WorkplaceIcon size={32} round />
        </WorkplaceShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LineShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <LineIcon size={32} round />
        </LineShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WeiboShareButton
          url={shareUrl}
          title={postData.title}
          image={`${postData.image}`}
          className={`${styles.shareContainerButton}`}
        >
          <WeiboIcon size={32} round />
        </WeiboShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <PocketShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <PocketIcon size={32} round />
        </PocketShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <InstapaperShareButton
          url={shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <HatenaShareButton
          url={shareUrl}
          title={postData.title}
          windowWidth={660}
          windowHeight={460}
          className={`${styles.shareContainerButton}`}
        >
          <HatenaIcon size={32} round />
        </HatenaShareButton>
      </div>
    </div>
  );
}
