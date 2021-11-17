import {FacebookShareButton, TelegramShareButton, EmailShareButton} from "react-share";
import {FacebookIcon, TelegramIcon, EmailIcon} from "react-share";

export const ShareButtons = ({url}) => {
    return (
        <div className="share-buttons">
            <FacebookShareButton url={url}>
                <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon size={35} round={true} />
            </TelegramShareButton>
            <EmailShareButton url={url}>
                <EmailIcon size={35} round={true} />
            </EmailShareButton>
        </div>
    )
}