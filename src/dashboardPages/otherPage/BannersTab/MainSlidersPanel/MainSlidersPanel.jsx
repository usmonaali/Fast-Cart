import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} from "../../../../api/slider";
import { getImageUrl } from "../../../../api/client";
import { useTranslation } from "react-i18next";

const MainSlidersPanel = () => {
  const [slides, setSlides] = useState([]);
  const [sliderImage, setSliderImage] = useState(null);
  const [sliderPreview, setSliderPreview] = useState(null);
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderSubtitle, setSliderSubtitle] = useState("");
  const [isSubmittingSlide, setIsSubmittingSlide] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState(null);

  const load = () => {
    getSlides().then(setSlides).catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (s) => {
    setEditingSlideId(s.id);
    setSliderTitle(s.title || "");
    setSliderSubtitle(s.subtitle || "");
    setSliderPreview(getImageUrl(s.url));
  };

  const cancelEdit = () => {
    setEditingSlideId(null);
    setSliderTitle("");
    setSliderSubtitle("");
    setSliderImage(null);
    setSliderPreview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить слайд?")) return;

    try {
      await deleteSlide(id);

      if (editingSlideId === id) {
        cancelEdit();
      }

      load();
    } catch (err) {
      console.error(err);
      alert("Не удалось удалить слайд.");
    }
  };

  const handleSave = async () => {
    setIsSubmittingSlide(true);

    try {
      const fd = new FormData();

      if (sliderImage) {
        fd.append("Image", sliderImage);
      }

      fd.append("Title", sliderTitle);
      fd.append("Subtitle", sliderSubtitle);
      fd.append("IsActive", true);

      if (editingSlideId) {
        await updateSlide(editingSlideId, fd);
      } else {
        if (!sliderImage) {
          alert("Выберите картинку.");
          setIsSubmittingSlide(false);
          return;
        }

        fd.append("SortOrder", slides.length);
        await createSlide(fd);
      }

      cancelEdit();
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось сохранить слайд.");
    } finally {
      setIsSubmittingSlide(false);
    }
  };
  const {t} = useTranslation()
  return (
    <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-4 h-fit">
      <h3 className="font-[600] text-[14px] mb-3 text-[#111927] dark:text-white">
        {t('slider.mainSlider')}
      </h3>

      <label className="border-2 border-dashed border-[#E5E7EB] dark:border-[#1F2937] rounded-md flex items-center justify-center h-[90px] cursor-pointer mb-3 overflow-hidden">
        {sliderPreview ? (
          <img src={sliderPreview} alt="" className="h-full object-contain" />
        ) : (
          <span className="text-[13px] text-[#2f6fed] underline">
            {t('slider.clickToUpload')}
          </span>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            setSliderImage(file);

            if (file) {
              setSliderPreview(URL.createObjectURL(file));
            }
          }}
          className="hidden"
        />
      </label>

      <div className="space-y-2 mb-3">
        {slides.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-3 border rounded px-3 py-2 ${
              editingSlideId === s.id
                ? "border-[#2f6fed]"
                : "border-[#E5E7EB] dark:border-[#1F2937]"
            }`}
          >
            <img
              src={getImageUrl(s.url)}
              alt=""
              className="w-10 h-8 object-cover rounded"
            />

            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#111927] dark:text-white truncate">
                {s.title || s.fileName}
              </p>

              {!s.isActive && (
                <p className="text-[11px] text-[#F04438]">{t('slider.subtitle')}</p>
              )}
            </div>

            <button onClick={() => startEdit(s)}>
              <Pencil className="w-4 h-4 text-[#6C737F] dark:text-slate-400" />
            </button>

            <button onClick={() => handleDelete(s.id)}>
              <Trash2 className="w-4 h-4 text-[#F04438]" />
            </button>
          </div>
        ))}
      </div>

      <input
        placeholder={t('slider.subtitle')}
        value={sliderSubtitle}
        onChange={(e) => setSliderSubtitle(e.target.value)}
        className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] mb-2"
      />

      <input
        placeholder={t('slider.title')}
        value={sliderTitle}
        onChange={(e) => setSliderTitle(e.target.value)}
        className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] mb-3"
      />

      <div className="flex gap-2">
        {editingSlideId && (
          <button
            onClick={cancelEdit}
            className="flex items-center justify-center gap-1 border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white text-[14px] px-4 py-2 rounded"
          >
            <X className="w-4 h-4" />
            {t('slider.cancel')}
          </button>
        )}

        <button
          onClick={handleSave}
          disabled={isSubmittingSlide}
          className="flex-1 bg-[#2f6fed] text-white text-[14px] py-2 rounded disabled:opacity-50"
        >
          {isSubmittingSlide
            ? `${t('slider.saving')}`
            : editingSlideId
              ? `${t('slider.saveChanges')}`
              : `${t('slider.save')}`}
        </button>
      </div>
    </div>
  );
};

export default MainSlidersPanel;
