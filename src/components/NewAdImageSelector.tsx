import { NewAdImageDTO } from '@dtos/NewAdDTO';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { AlertDialog, Badge, Center, HStack, Icon, Image, Pressable } from 'native-base';
import uuid from 'react-native-uuid';

import { useEffect, useRef, useState } from 'react';

import { Button } from './Button';
import { Loading } from './Loading';

type NewAdImageSelectorProps = {
  // existingAddImages?: ProductImageDTO[];
  productId?: string;
  newAdImages: NewAdImageDTO[];
  addImageIdToBeDeleted?: (imageId: string) => void;
  setNewAdImages: (imagesObjects: NewAdImageDTO[]) => void;
};

export const NewAdImageSelector = ({
  newAdImages,
  addImageIdToBeDeleted,
  setNewAdImages,
}: NewAdImageSelectorProps) => {
  // const [newAdImages, setNewAdImages] = useState<NewAdImageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteImageAlertOpen, setIsDeleteImageAlertOpen] = useState(false);
  const [imageUriToBeDeleted, setImageUriToBeDeleted] = useState('');

  const cancelRef = useRef(null);

  const { user } = useAuth();

  // const deleteProductPhotoLocally = async (imageUri: string) => {
  //   const updatedPhotos = newAdImages.filter((photos) => photos.uri !== imageUri);
  //   setNewAdImages(updatedPhotos);
  //   // setNewAddImages(updatedPhotos);
  // };

  // const getPhotoIdFromUri = (imageUri: string) => {
  //   const photoToBeDeleted = newAdImages.find((image) => image.uri === imageUri);
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
    const newAdImagesFilterred = newAdImages.filter(
      (image) => image.uri !== imageUriToBeDeleted,
    );
    setNewAdImages(newAdImagesFilterred);
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

    setNewAdImages([...newAdImages, fileObject]);
    // setNewAddImages([...newAdImages, photoObject]);

    // if (setUpdatedNewImages && updateNewImages)
    //   setUpdatedNewImages([...updateNewImages, fileObject]);
  };

  useEffect(() => {
    setIsLoading(true);

    // if (newAdImages.length > 0) {
    //   const standardImagesOjects = newAdImages.map((image) => {
    //     const fileExtension = image.path.split('.').pop();

    //     const imageObject = {
    //       id: image.id,
    //       name: `${user.name.toLowerCase()}.${fileExtension}`,
    //       type: `image/${fileExtension}`,
    //       uri: `${api.defaults.baseURL}/images/${image.path}`,
    //     };

    //     return imageObject;
    //   });

    //   setNewAdImages(standardImagesOjects);
    // } else {
    //   setNewAdImages(newAddImages);
    // }

    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(
  //     '🚀 ~ file: NewAdImageSelector.tsx ~ line 162 ~ useEffect ~ newAdImages',
  //     newAdImages,
  //   );
  //   console.log(
  //     '🚀 ~ file: NewAdImageSelector.tsx ~ line 162 ~ useEffect ~ newAdImages.lengt',
  //     newAdImages.length,
  //   );
  // }, [newAdImages]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <HStack
        flexWrap="wrap"
        mt={3}
        mb={6}
      >
        {newAdImages.length > 0 &&
          newAdImages.map((photo) => (
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

        {newAdImages.length < 3 && (
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
