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
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import { formatDate } from "../../utilities";
import usePost from "../../Hooks/usePost";

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

  const postsHeadCells = useMemo(
    () => [
      {
        id: "url_image",
        label: "Imagen",
        align: "left",
        disablePadding: false,
        width: 240,
        format: (value) => (
          <Box display="flex" width="100%" sx={{ aspectRatio: 1 }}>
            <img src={value} alt="Post image" width="100%" style={{ objectFit: "cover", borderRadius: 8 }} />
          </Box>
        ),
      },
      {
        id: "url_video",
        label: "Video",
        align: "left",
        width: 240,
        disablePadding: false,
        format: (value) => (
          <Box display="flex" width="100%" sx={{ aspectRatio: 1 }}>
            <video src={value} width="100%" style={{ objectFit: "cover", borderRadius: 8 }} muted autoPlay />
          </Box>
        ),
      },
      {
        id: "title",
        label: "Título",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "description",
        label: "Descripción",
        align: "left",
        disablePadding: false,
        format: (value) => value,
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
    const { name, value } = target;
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

    const { status, data } = await $Post.add(selectedPost);

    if (status) {
      setPosts((prev) => [...prev, { ...selectedPost, id: data.data }]);
      setFeedback({ open: true, message: "Publicación creada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdatePost = async (event) => {
    event.preventDefault();

    if (!isValidPost) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Post.update(selectedPost);

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
          <Button variant="contained" onClick={() => setCurrentModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={postsHeadCells} rows={posts} initialOrderBy="title" />
      </Grid>

      <Dialog
        open={currentModal === "create" || currentModal === "update"}
        onClose={onClearFields}
        maxWidth="xl"
        fullWidth
      >
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
                <TextField
                  label="Descripción"
                  name="description"
                  rows={4}
                  value={selectedPost.description}
                  onChange={onChangeFields}
                  multiline
                  fullWidth
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
                <TextField
                  label="Url de la imagen"
                  name="url_image"
                  value={selectedPost.url_image}
                  onChange={onChangeFields}
                  fullWidth
                />
                <TextField
                  label="Url del video"
                  name="url_video"
                  value={selectedPost.url_video}
                  onChange={onChangeFields}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button
              onClick={currentModal === "create" ? onCreatePost : onUpdatePost}
              variant="contained"
              disabled={!isValidPost}
            >
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
