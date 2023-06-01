import { NewAdImageDTO } from '@dtos/NewAdDTO';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { AlertDialog, Badge, Center, HStack, Icon, Image, Pressable } from 'native-base';
import uuid from 'react-native-uuid';

import { useEffect, useRef, useState } from 'react';

import { Button } from './Button';
import { Loading } from './Loading';

type AdImageSelectorProps = {
  // existingAddImages?: DatabaseProductImageDTO[];
  productId?: string;
  adImages: NewAdImageDTO[];
  addImageIdToBeDeleted?: (imageId: string) => void;
  setAdImages: (imagesObjects: NewAdImageDTO[]) => void;
};

export const AdImageSelector = ({
  adImages,
  addImageIdToBeDeleted,
  setAdImages,
}: AdImageSelectorProps) => {
  // const [adImages, setAdImages] = useState<NewAdImageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteImageAlertOpen, setIsDeleteImageAlertOpen] = useState(false);
  const [imageUriToBeDeleted, setImageUriToBeDeleted] = useState('');

  const cancelRef = useRef(null);

  const { user } = useAuth();

  // const deleteProductPhotoLocally = async (imageUri: string) => {
  //   const updatedPhotos = adImages.filter((photos) => photos.uri !== imageUri);
  //   setAdImages(updatedPhotos);
  //   // setNewAddImages(updatedPhotos);
  // };

  // const getPhotoIdFromUri = (imageUri: string) => {
  //   const photoToBeDeleted = adImages.find((image) => image.uri === imageUri);
  //   if (!photoToBeDeleted || !photoToBeDeleted.id) return '';

  //   return photoToBeDeleted.id;
  // };

  // const deleteProductPhotoLocallyAndFromDatabase = async (imageUri: string) => {
  //   const photoId = getPhotoIdFromUri(imageUri);

  //   deleteProductPhotoLocally(imageUri);
  //   if (addImageIdToBeDeleted) addImageIdToBeDeleted(photoId);
  // };

  // const deleteProductPhotoLocallyOrInDatabase = (imageUri: string) => {
  //   if (existingAddImages) {
  //     deleteProductPhotoLocallyAndFromDatabase(imageUri);
  //   } else {
  //     deleteProductPhotoLocally(imageUri);
  //   }
  // };

  function openDeleteImageAlert(imageUri: string) {
    setImageUriToBeDeleted(imageUri);
    setIsDeleteImageAlertOpen(true);
  }

  function closeDeleteImageAlert() {
    setImageUriToBeDeleted('');
    setIsDeleteImageAlertOpen(false);
  }

  async function handleDeleteAdImage() {
    const adImagesFilterred = adImages.filter(
      (image) => image.uri !== imageUriToBeDeleted,
    );
    setAdImages(adImagesFilterred);
    setIsDeleteImageAlertOpen(false);
  }

  const handleAddImageAd = async () => {
    // const photoObject = await selectImageFromGalery();
    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });

    if (selectedImage.canceled) return;

    const fileUri = selectedImage.assets[0].uri;
    const fileExtension = fileUri.split('.').pop();

    const fileObject = {
      id: String(uuid.v4()),
      name: `${user.name.toLowerCase().split(' ').join('-')}.${fileExtension}`,
      type: `image/${fileExtension}`,
      uri: fileUri,
    };

    if (!fileObject) return;

    setAdImages([...adImages, fileObject]);
    // setNewAddImages([...adImages, photoObject]);

    // if (setUpdatedNewImages && updateNewImages)
    //   setUpdatedNewImages([...updateNewImages, fileObject]);
  };

  useEffect(() => {
    setIsLoading(true);

    // if (adImages.length > 0) {
    //   const standardImagesOjects = adImages.map((image) => {
    //     const fileExtension = image.path.split('.').pop();

    //     const imageObject = {
    //       id: image.id,
    //       name: `${user.name.toLowerCase()}.${fileExtension}`,
    //       type: `image/${fileExtension}`,
    //       uri: `${api.defaults.baseURL}/images/${image.path}`,
    //     };

    //     return imageObject;
    //   });

    //   setAdImages(standardImagesOjects);
    // } else {
    //   setAdImages(newAddImages);
    // }
    // console.log('🚀 ~ file: AdImageSelector.tsx:27 ~ adImages:', adImages);

    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(
  //     '🚀 ~ file: AdImageSelector.tsx ~ line 162 ~ useEffect ~ adImages',
  //     adImages,
  //   );
  //   console.log(
  //     '🚀 ~ file: AdImageSelector.tsx ~ line 162 ~ useEffect ~ adImages.length',
  //     adImages.length,
  //   );
  // }, [adImages]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <HStack
        flexWrap="wrap"
        mt={3}
        mb={6}
      >
        {adImages.length > 0 &&
          adImages.map((photo) => (
            <Pressable
              onPress={() => openDeleteImageAlert(photo.uri)}
              key={photo.uri}
            >
              <Badge
                position="absolute"
                zIndex={2}
                bgColor="gray.5"
                rounded="full"
                p={0}
                top={1}
                right={4}
              >
                <Icon
                  as={AntDesign}
                  name="close"
                  size={3}
                  color="gray.4"
                />
              </Badge>
              <Image
                w={100}
                h={100}
                rounded="md"
                source={{ uri: photo.uri }}
                alt="Foto do produto"
                mr={3}
                mb={2}
              />
            </Pressable>
          ))}

        {adImages.length < 3 && (
          <Pressable
            bgColor="gray.5"
            w={100}
            h={100}
            rounded="md"
            onPress={handleAddImageAd}
          >
            <Center flex={1}>
              <Icon
                as={AntDesign}
                name="plus"
                size={6}
                color="gray.4"
              />
            </Center>
          </Pressable>
        )}
      </HStack>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteImageAlertOpen}
        onClose={closeDeleteImageAlert}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header
            fontSize="lg"
            fontWeight="bold"
          >
            Deseja excluir essa imagem?
          </AlertDialog.Header>

          <AlertDialog.Body>
            <Center>
              <Image
                source={{ uri: imageUriToBeDeleted }}
                size="xl"
                alt="imagem do anúncio a ser removida"
              />
            </Center>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <HStack
              space={2}
              w="100%"
            >
              <Button
                title="Cancelar"
                variant="gray"
                onPress={closeDeleteImageAlert}
                w="47%"
              >
                Cancel
              </Button>
              <Button
                title="Remover"
                variant="blue"
                onPress={handleDeleteAdImage}
                w="47%"
              >
                Delete
              </Button>
            </HStack>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
