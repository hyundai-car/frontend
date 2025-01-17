import React, { Component } from "react";
import styled from "styled-components";

interface Props {
  images: string[];
  numImages: number;
}

interface State {
  dragging: boolean;
  imageIndex: number;
  dragStartIndex: number;
  dragStart?: number;
  imagesLoaded: number[];
}

const pixelsPerDegree = 3;

class Car360Image extends Component<Props, State> {
  private animationInterval: ReturnType<typeof setInterval> | null = null;

  state: State = {
    dragging: false,
    imageIndex: 0,
    dragStartIndex: 0,
    imagesLoaded: [],
  };

  componentDidMount = () => {
    this.preloadImages();
    this.startInitialAnimation();
  };

  componentWillUnmount = () => {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  };

  startInitialAnimation = () => {
    let currentIndex = 0;

    this.animationInterval = setInterval(() => {
      if (currentIndex < 37) {
        this.setState({ imageIndex: currentIndex % 36 });
        currentIndex++;
      } else {
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
      }
    }, 100);
  };

  handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const firstTouch = e.touches[0];
    if (!firstTouch) return;

    this.setState((state) => ({
      dragging: true,
      dragStart: firstTouch.clientX,
      dragStartIndex: state.imageIndex,
    }));
  };

  handleTouchEnd = () => {
    this.setState({ dragging: false });
  };

  handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!this.state.dragging) return;

    const firstTouch = e.touches[0];
    if (!firstTouch) return;

    this.updateImageIndex(firstTouch.clientX);
  };

  updateImageIndex = (currentPosition: number) => {
    const { numImages } = this.props;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;

    if (dragStart === undefined) return;

    let dx = (currentPosition - dragStart) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;

    if (index !== imageIndex) {
      this.setState({ imageIndex: index });
    }
  };

  preventDragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  preloadImages = () => {
    const { images, numImages } = this.props;
    const imagesLoaded: number[] = [];

    for (let i = 0; i < numImages; i++) {
      // const image = new Image();
      const image = new window.Image();

      const imageUrl = images[i];
      if (!imageUrl) continue; // 이미지 URL이 없으면 건너뛰기
      image.src = imageUrl;

      image.onload = () => {
        imagesLoaded.push(i);
        if (imagesLoaded.length === numImages) {
          this.setState({ imagesLoaded });
        }
      };
    }
  };

  renderImage = () => {
    const { imageIndex } = this.state;
    const { images } = this.props;
    return (
      <Container>
        <Image alt="" src={images[imageIndex]} />
      </Container>
    );
  };

  render = () => {
    return (
      <Wrapper
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onDragStart={this.preventDragHandler}
      >
        {this.renderImage()}
      </Wrapper>
    );
  };
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  user-select: none;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export default Car360Image;
