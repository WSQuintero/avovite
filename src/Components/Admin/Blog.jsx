import React, { useEffect, useMemo, useState } from "react";
import EnhancedTable from "../EnhancedTable";
import useSession from "../../Hooks/useSession";
import PostService from "../../Services/post.service";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import { formatDate } from "../../utilities";
import usePost from "../../Hooks/usePost";
import TiptapEditor from "../TiptapEditor";

const isYouTubeVideo = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

function Blog() {
  const $Post = usePost();
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({
    id: null,
    title: "",
    description: "",
    url_image: "",
    url_video: "",
  });
  const [currentModal, setCurrentModal] = useState(null);
  const isValidPost = useMemo(
    () => selectedPost.title && selectedPost.description && selectedPost.url_image && selectedPost.url_video,
    [selectedPost]
  );

  const convertToEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Return the original URL if it's not a YouTube video
  };
  const postsHeadCells = useMemo(
    () => [
      {
        id: "url_image",
        label: "Imagen",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box display="flex" width={200} sx={{ aspectRatio: 1 }}>
            <img src={value instanceof File ? URL.createObjectURL(value) : value} alt="Post image" width="100%" style={{ objectFit: "cover", borderRadius: 8 }} />
          </Box>
        ),
      },

      {
        id: "url_video",
        label: "Video",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box display="flex" width={200} sx={{ aspectRatio: 1 }}>
            {isYouTubeVideo(value) ? (
              <iframe
                src={convertToEmbedUrl(value)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", objectFit: "cover", borderRadius: 8, border: 0 }}
                onLoad={() => console.log("Video loaded successfully")}
                onError={() => console.log("Error loading video")}
              ></iframe>
            ) : (
              <video src={value} width="100%" style={{ objectFit: "cover", borderRadius: 8 }} muted autoPlay />
            )}
          </Box>
        ),
      },
      {
        id: "title",
        label: "Título",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>{value}</Box>
        ),
      },
      {
        id: "description",
        label: "Descripción",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>{value}</Box>
        ),
      },
      {
        id: "updated_at",
        label: "Actualizado en",
        align: "left",
        disablePadding: false,
        format: (value) => formatDate(value),
      },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setSelectedPost(row);
                setCurrentModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setSelectedPost(row);
                setCurrentModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );

  const fetchPosts = async () => {
    const { status, data } = await $Post.get();

    if (status) {
      setPosts(data.data);
    }
  };

  const onChangeFields = ({ target }) => {
    const { name } = target;
    let value;

    if (target.type === 'file') {
      value = target.files[0];
    } else {
      value = target.value;
    }


    setSelectedPost((prev) => ({ ...prev, [name]: value }));
  };





  const onClearFields = () => {
    setCurrentModal(null);
    setSelectedPost({
      id: null,
      title: "",
      description: "",
      url_image: "",
      url_video: "",
    });
  };


  const onCreatePost = async (event) => {
    event.preventDefault();

    if (!isValidPost) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    try {
      // Utilizar la instancia $Post para enviar la solicitud
      const { status, data } = await $Post.add(selectedPost);

      if (status) {
        setPosts((prev) => [...prev, { ...selectedPost, id: data.data }]);
        setFeedback({ open: true, message: "Publicación creada exitosamente.", status: "success" });
        onClearFields();
      } else {
        setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };



  const onUpdatePost = async (event) => {
    event.preventDefault();

    if (!isValidPost) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    // Crear un nuevo objeto con solo las propiedades necesarias para la actualización
    const updatedPost = {
      id: selectedPost.id,
      title: selectedPost.title,
      description: selectedPost.description,
      url_video:selectedPost.url_video,
      url_image:selectedPost.url_image
      // Otras propiedades necesarias...
    };

    const { status } = await $Post.update(updatedPost);

    if (status) {
      setPosts((prev) => prev.map((p) => (p.id === selectedPost.id ? selectedPost : p)));
      setFeedback({ open: true, message: "Publicación actualizada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };


  const onDeletePost = async () => {
    const { status } = await $Post.delete(selectedPost);

    if (status) {
      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
      setFeedback({ open: true, message: "Publicación eliminada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if ($Post) {
      (async () => {
        await fetchPosts();
      })();
    }
  }, [$Post]);

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setCurrentModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={postsHeadCells} rows={posts} initialOrderBy="title" />
      </Grid>

      <Dialog open={currentModal === "create" || currentModal === "update"} onClose={onClearFields} maxWidth="xl" fullWidth>
        <DialogTitle color="primary.main">{currentModal === "create" ? "Crear" : "Editar"} publicación</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={currentModal === "create" ? onCreatePost : onUpdatePost}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" gap={2}>
                <TextField label="Título" name="title" value={selectedPost.title} onChange={onChangeFields} fullWidth />
              </Grid>
              <Grid display="flex" gap={2}>
                <TiptapEditor
                  placeholder="Descripción"
                  name="description"
                  value={selectedPost.description}
                  onChange={({ html }) =>{
                    setSelectedPost((prev) => ({ ...prev, ["description"]: html }));
                  }}
                />
              </Grid>
              <Grid
                display="flex"
                gap={2}
                sx={(t) => ({
                  [t.breakpoints.down("lg")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Grid sx={{ width: "50%" }}>
                  <InputLabel htmlFor="upload-image">Subir imagen</InputLabel>
                  <input
                    id="upload-image"
                    type="file"
                    onChange={onChangeFields} // Aquí handleImageUpload es el manejador de eventos que procesa la imagen seleccionada
                    style={{ border: "1px solid #999", borderRadius: "10px", padding: "15px", width: "100%" }}
                    name="url_image"

                  />
                </Grid>

                <TextField
                  label="Url del video"
                  name="url_video"
                  value={selectedPost.url_video}
                  onChange={onChangeFields}
                  sx={{ width: "50%", marginTop: "25px" }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={currentModal === "create" ? onCreatePost : onUpdatePost} variant="contained" disabled={!isValidPost}>
              {currentModal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={currentModal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar publicación</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar esta publicación?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeletePost}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Blog;