import { useState, useEffect } from "react";
import "./vertsvideo.css";
import "react-datepicker/dist/react-datepicker.css";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import api from "../../Services/api";
import { toast } from "react-toastify";

function Postverts() {
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [dataDisable, setDataDisable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [legenda, setLegenda] = useState("");
  const idUser = localStorage.getItem("cc_p");
  const token = localStorage.getItem("cc_t");
  const [videoURL, setVideoURL] = useState("");
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get(`/profile/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    }

    loadPosts();
  }, []);

  const handleDataChange = (newValue) => {
    const currentDate = dayjs().startOf("day");
    const selectedDate = dayjs(newValue).startOf("day");
    if (selectedDate.isBefore(currentDate)) {
      // A data selecionada é anterior à data atual
      setData(null); // Limpar a data selecionada
    } else {
      setData(newValue);
      if (dayjs(data).isSame(currentDate, "day")) {
        // A data selecionada é a data atual, verifique também a hora selecionada
        const currentDateTime = dayjs();
        const selectedDateTime = dayjs(data)
          .set("hour", hora.hour)
          .set("minute", hora.minute);
        if (selectedDateTime.isBefore(currentDateTime)) {
          // A hora selecionada é anterior à hora atual
          setHora(null); // Limpar a hora selecionada
        }
      }
    }
  };

  const handleHoraChange = (newValue) => {
    const currentDateTime = dayjs();
    const selectedDateTime = dayjs(data)
      .set("hour", newValue.hour)
      .set("minute", newValue.minute);

    if (
      selectedDateTime.isBefore(currentDateTime) ||
      dayjs(data).isBefore(dayjs().startOf("day"))
    ) {
      // A hora selecionada é anterior à hora atual ou a data selecionada é anterior à data atual
      setHora(null); // Limpar a hora selecionada
    } else {
      setHora(newValue);
    }
  };

  const handleFileSelect = (event) => {
    // we only get the selected file from input element's event
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setVideoURL(videoURL);
  };

  async function postarVerts() {
    if (selectedFile != null) {
      const formData = new FormData();

      formData.append("files", selectedFile);

      try {
        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const videoPath = response.data.files[0].location;
        console.log(videoPath);

        try {
          const postandoVerts = await api.post(`/vert`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            user: idUser,
            content: videoPath,
            legenda: legenda,
          });
        } catch (error) {
          console.log(error);
        }
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Selecione um Video para publicar", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const changeLegenda = (event) => {
    setLegenda(event.target.value);
  };

  return (
    <div className="containerPostVerts">
      <div>
        <h2>Publicar no Verts</h2>
      </div>

      <div className="">
        <textarea
          className="textareaPostVerts"
          placeholder="Legenda"
          onChange={changeLegenda}
          aria-label="With textarea"
        ></textarea>
      </div>

      <div>
        <div className="containerButtonandVideo">
          <label className="buttonLabelVideo" htmlFor="video-upload">
            Escolha o vídeo
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>
      {videoURL && (
        <div className="">
          <video className="videoPostVerts" controls src={videoURL} />
        </div>
      )}

      <div>
        <button className="buttonLabelVideo " onClick={postarVerts}>
          Publicar
        </button>
      </div>
    </div>
  );
}

export default Postverts;
