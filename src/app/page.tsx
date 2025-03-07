import { auth, login, logout } from "./actions";

import Navbar from "../components/navbar";
import ImageGallery from "../components/image-gallery";

export default async function Home() {
  const subject = await auth();
  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "Jane Doe",
    avatar: "https://source.unsplash.com/600x400/?nature",
  };

  // Real image data with various aspect ratios
  const images = [
    {
      id: 1,
      src: "https://source.unsplash.com/600x400/?nature",
      alt: "Gallery Image 1",
      aspectRatio: "3/2",
    },
    {
      id: 2,
      src: "https://source.unsplash.com/600x800/?architecture",
      alt: "Gallery Image 2",
      aspectRatio: "3/4",
    },
    {
      id: 3,
      src: "https://source.unsplash.com/500x500/?animals",
      alt: "Gallery Image 3",
      aspectRatio: "1/1",
    },
    {
      id: 4,
      src: "https://source.unsplash.com/600x300/?ocean",
      alt: "Gallery Image 4",
      aspectRatio: "2/1",
    },
    {
      id: 5,
      src: "https://source.unsplash.com/400x600/?city",
      alt: "Gallery Image 5",
      aspectRatio: "2/3",
    },
    {
      id: 6,
      src: "https://source.unsplash.com/800x400/?mountains",
      alt: "Gallery Image 6",
      aspectRatio: "2/1",
    },
    {
      id: 7,
      src: "https://source.unsplash.com/600x600/?abstract",
      alt: "Gallery Image 7",
      aspectRatio: "1/1",
    },
    {
      id: 8,
      src: "https://source.unsplash.com/600x450/?food",
      alt: "Gallery Image 8",
      aspectRatio: "4/3",
    },
    {
      id: 9,
      src: "https://source.unsplash.com/450x600/?travel",
      alt: "Gallery Image 9",
      aspectRatio: "3/4",
    },
    {
      id: 10,
      src: "https://source.unsplash.com/900x300/?landscape",
      alt: "Gallery Image 10",
      aspectRatio: "3/1",
    },
    {
      id: 11,
      src: "https://source.unsplash.com/500x700/?technology",
      alt: "Gallery Image 11",
      aspectRatio: "5/7",
    },
    {
      id: 12,
      src: "https://source.unsplash.com/700x500/?sports",
      alt: "Gallery Image 12",
      aspectRatio: "7/5",
    },
    {
      id: 13,
      src: "https://source.unsplash.com/400x600/?people",
      alt: "Gallery Image 13",
      aspectRatio: "2/3",
    },
    {
      id: 14,
      src: "https://source.unsplash.com/600x400/?music",
      alt: "Gallery Image 14",
      aspectRatio: "3/2",
    },
    {
      id: 15,
      src: "https://source.unsplash.com/500x500/?art",
      alt: "Gallery Image 15",
      aspectRatio: "1/1",
    },
  ];

  return (
    <>
      {subject ? (
        <>
          <main className="min-h-screen flex flex-col">
            <Navbar user={user} />
            {images && <ImageGallery images={images} />}
          </main>
        </>
      ) : (
        <>
          {login()} {/* Call a function when subject is missing */}
        </>
      )}
    </>
  );
}
