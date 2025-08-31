import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";

interface Personal {
  id: number;
  name: string;
  bio: string;
  email: string;
  phone: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  type: string;
  link: string;
  img: string;
  languajes: string[];
}

interface Skill {
  id: number;
  languaje: string;
  level: string;
}

export default function Dashboard() {
  const { session } = useSession();
  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
  }

  const [tab, setTab] = useState<"personal" | "projects" | "skills">(
    "personal"
  );

  const [personal, setPersonal] = useState<Personal | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Modales
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [creatingSkill, setCreatingSkill] = useState(false);
  const [modalLanguaje, setModalLanguaje] = useState("");
  const [modalLevel, setModalLevel] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState(false);
  const [modalProjectTitle, setModalProjectTitle] = useState("");
  const [modalProjectDesc, setModalProjectDesc] = useState("");
  const [modalProjectLink, setModalProjectLink] = useState("");
  const [modalProjectImage, setModalProjectImage] = useState("");
  const [modalProjectLenguajes, setModalProjectLenguajes] = useState("");
  const [modalProjectType, setModalProjectType] = useState("");

  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const [notification, setNotification] = useState("");

  // Cargar datos
  const loadData = async () => {
    try {
      const { data: personalData } = await supabase
        .from("info")
        .select("*")
        .single();
      setPersonal(personalData || null);

      const { data: projectsData } = await supabase
        .from("proyects")
        .select("*");
      setProjects(projectsData || []);

      const { data: skillsData } = await supabase.from("skills").select("*");
      setSkills(skillsData || []);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const colors = {
    forest: "bg-forest",
    grass: "bg-grass",
    petroleoum: "bg-petroleoum",
  };

  // Personal
  const updatePersonal = async () => {
    if (!personal) return;
    await supabase.from("info").update(personal).eq("id", personal.id);
    setNotification("Información personal actualizada");
  };

  // Skills
  const openEditSkillModal = (skill: Skill) => {
    setEditingSkill(skill);
    setModalLanguaje(skill.languaje);
    setModalLevel(skill.level);
  };
  const openCreateSkillModal = () => {
    setCreatingSkill(true);
    setModalLanguaje("");
    setModalLevel("");
  };
  const saveSkill = async () => {
    if (editingSkill) {
      await supabase
        .from("skills")
        .update({ languaje: modalLanguaje, level: modalLevel })
        .eq("id", editingSkill.id);
      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkill.id
            ? { ...s, languaje: modalLanguaje, level: modalLevel }
            : s
        )
      );
      setEditingSkill(null);
    } else if (creatingSkill) {
      const { data } = await supabase
        .from("skills")
        .insert({ languaje: modalLanguaje, level: modalLevel });
      if (data) setSkills((prev) => [...prev, data[0]]);
      setCreatingSkill(false);
    }
    loadData()
  };

  // Proyectos
  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setModalProjectTitle(project.title);
    setModalProjectDesc(project.description);
    setModalProjectLink(project.link);
    setModalProjectImage(project.img);
    setModalProjectType(project.type);
    setModalProjectLenguajes(
      project.languajes ? project.languajes.join(", ") : ""
    );
  };

  const openCreateProjectModal = () => {
    setCreatingProject(true);
    setModalProjectTitle("");
    setModalProjectDesc("");
    setModalProjectLink("");
    setModalProjectImage("");
  };

  const parseLenguajes = (input: string): string[] => {
    return input
      .split(",") // separa por coma
      .map((lang) => lang.trim()) // limpia espacios
      .filter((lang) => lang.length > 0); // elimina vacíos
  };

  const saveProject = async () => {
    const lenguajesArray = parseLenguajes(modalProjectLenguajes); // 👈 acá parseás

    if (editingProject) {
      await supabase
        .from("proyects")
        .update({
          title: modalProjectTitle,
          description: modalProjectDesc,
          link: modalProjectLink,
          img: modalProjectImage,
          type: modalProjectType,
          languajes: lenguajesArray,
        })
        .eq("id", editingProject.id);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                title: modalProjectTitle,
                description: modalProjectDesc,
                link: modalProjectLink,
                image: modalProjectImage,
                type: modalProjectType,
                languajes: lenguajesArray,
              }
            : p
        )
      );
      setEditingProject(null);
    } else if (creatingProject) {
      const { data, error } = await supabase.from("proyects").insert({
        title: modalProjectTitle,
        description: modalProjectDesc,
        link: modalProjectLink,
        img: modalProjectImage,
        type: modalProjectType,
        languajes: lenguajesArray,
      });
      if (data) setProjects((prev) => [...prev, data[0]]);
      console.log(error);
      setCreatingProject(false);
    }
    loadData()
  };

  const deleteSkill = (skill: Skill) => {
    setConfirmMessage("¿Seguro que quieres eliminar esta skill?");
    setConfirmAction(() => async () => {
      await supabase.from("skills").delete().eq("id", skill.id);
      setSkills((prev) => prev.filter((s) => s.id !== skill.id));
    });
    loadData()
  };
  const deleteProject = (project: Project) => {
    setConfirmMessage("¿Seguro que quieres eliminar este proyecto?");
    setConfirmAction(() => async () => {
      await supabase.from("proyects").delete().eq("id", project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    });
    loadData()
  };

  const cancelModal = () => {
    setEditingSkill(null);
    setCreatingSkill(false);
    setEditingProject(null);
    setCreatingProject(false);
    setConfirmAction(null);
  };

  return (
    <main className={`${colors.forest} p-6 min-h-screen text-white`}>
      <button
        onClick={() => navigate("/")}
        className="bg-grass text-white font-bold px-4 py-1 mb-2 rounded-lg hover:bg-petroleoum hover:ring-2 hover:ring-grass hover:text-grass transition-colors hover:cursor-pointer mt-4"
      >
        Volver
      </button>
      <h1 className="text-3xl font-bold mb-6">Dashboard Portfolio</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`hover:cursor-pointer px-4 py-2 rounded ${
            tab === "personal"
              ? colors.grass + " text-white"
              : colors.petroleoum
          }`}
          onClick={() => setTab("personal")}
        >
          Personal
        </button>
        <button
          className={`hover:cursor-pointer px-4 py-2 rounded ${
            tab === "projects"
              ? colors.grass + " text-white"
              : colors.petroleoum
          }`}
          onClick={() => setTab("projects")}
        >
          Proyectos
        </button>
        <button
          className={`hover:cursor-pointer px-4 py-2 rounded ${
            tab === "skills" ? colors.grass + " text-white" : colors.petroleoum
          }`}
          onClick={() => setTab("skills")}
        >
          Skills
        </button>
      </div>

      {/* Personal */}
      {tab === "personal" && personal && (
        <div className="flex flex-col gap-4">
          <input
            className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
            value={personal.name}
            onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
            value={personal.bio}
            onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
            placeholder="Bio"
          />
          <input
            className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
            value={personal.email}
            onChange={(e) =>
              setPersonal({ ...personal, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
            value={personal.phone || ""}
            onChange={(e) =>
              setPersonal({ ...personal, phone: e.target.value })
            }
            placeholder="Teléfono"
          />
          <button
            className={`${colors.grass} text-white px-4 py-2 rounded`}
            onClick={updatePersonal}
          >
            Guardar
          </button>
        </div>
      )}

      {/* Proyectos */}
      {tab === "projects" && (
        <div className="flex flex-col gap-4">
          <button
            className={`${colors.grass} text-white px-4 py-2 rounded`}
            onClick={openCreateProjectModal}
          >
            Agregar Proyecto
          </button>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${colors.petroleoum} border p-4 rounded flex justify-between items-center`}
            >
              <div>
                <p className="font-semibold">{project.title}</p>
                <p>{project.description}</p>
                <p className="text-blue-400 underline">{project.link}</p>
                {project.img && (
                  <img
                    src={project.img}
                    alt="Project"
                    className="mt-2 w-32 h-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => openEditProjectModal(project)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => deleteProject(project)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {tab === "skills" && (
        <div className="flex flex-col gap-4">
          <button
            className={`${colors.grass} text-white px-4 py-2 rounded`}
            onClick={openCreateSkillModal}
          >
            Agregar Skill
          </button>
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`${colors.petroleoum} border p-4 rounded flex justify-between items-center`}
            >
              <p>
                {skill.languaje} - {skill.level}
              </p>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => openEditSkillModal(skill)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => deleteSkill(skill)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modales Skills */}
      {(editingSkill || creatingSkill) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div
            className={`${colors.forest} p-6 rounded w-96 flex flex-col gap-4`}
          >
            <h2 className="text-xl font-bold mb-2">
              {editingSkill ? "Editar Skill" : "Agregar Skill"}
            </h2>
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalLanguaje}
              onChange={(e) => setModalLanguaje(e.target.value)}
              placeholder="Skill"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalLevel}
              onChange={(e) => setModalLevel(e.target.value)}
              placeholder="Nivel"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className={`${colors.grass} px-4 py-2 rounded text-white`}
                onClick={saveSkill}
              >
                Guardar
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded text-white"
                onClick={cancelModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modales Proyectos */}
      {(editingProject || creatingProject) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div
            className={`${colors.forest} p-6 rounded w-96 flex flex-col gap-4`}
          >
            <h2 className="text-xl font-bold mb-2">
              {editingProject ? "Editar Proyecto" : "Agregar Proyecto"}
            </h2>
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectTitle}
              onChange={(e) => setModalProjectTitle(e.target.value)}
              placeholder="Título"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectDesc}
              onChange={(e) => setModalProjectDesc(e.target.value)}
              placeholder="Descripción"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectType}
              onChange={(e) => setModalProjectType(e.target.value)}
              placeholder="Tipo"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectLink}
              onChange={(e) => setModalProjectLink(e.target.value)}
              placeholder="Link"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectImage}
              onChange={(e) => setModalProjectImage(e.target.value)}
              placeholder="Link de la imagen"
            />
            <input
              className="p-2 w-full text-white bg-transparent border border-gray-500 rounded"
              value={modalProjectLenguajes}
              onChange={(e) => setModalProjectLenguajes(e.target.value)}
              placeholder="Lenguajes"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className={`${colors.grass} px-4 py-2 rounded text-white`}
                onClick={saveProject}
              >
                Guardar
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded text-white"
                onClick={cancelModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación */}
      {confirmAction && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div
            className={`${colors.forest} p-6 rounded w-96 flex flex-col gap-4`}
          >
            <p>{confirmMessage}</p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className={`${colors.grass} px-4 py-2 rounded text-white`}
                onClick={() => {
                  confirmAction();
                  setConfirmAction(null);
                }}
              >
                Sí
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded text-white"
                onClick={() => setConfirmAction(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Notificación */}
      {notification && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div
            className={`${colors.forest} p-6 rounded w-96 flex flex-col gap-4`}
          >
            <p>{notification}</p>
            <div className="flex justify-end mt-2">
              <button
                className={`${colors.grass} px-4 py-2 rounded text-white`}
                onClick={() => setNotification("")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
