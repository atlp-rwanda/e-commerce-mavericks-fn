import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface Props {
  styles: string;
  image: string;
  alt?: string;
  handleClick?: (image: string) => void;
  enableZoom?: boolean;
  isSpotted?: boolean;
}

export const ImageCard = ({ image, styles, alt, handleClick, enableZoom = true, isSpotted = false }: Props) => {
  const imgClass = isSpotted ? `border border-greenColor rounded-lg p-1 ${styles}` : styles;
  const imgElement = (
    <img onClick={() => handleClick && handleClick(image)} className={imgClass} src={image} alt={alt} />
  );

  return enableZoom ? (
    <Zoom wrapElement='span' a11yNameButtonZoom='Tap to zoom'>
      {imgElement}
    </Zoom>
  ) : (
    imgElement
  );
};
