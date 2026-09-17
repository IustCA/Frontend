import { useCallback, useState } from "react";
import { Link, useParams } from "react-router";
import { ProfilePageSkeleton } from "../shared/PageLoader.jsx";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../hooks/useUserInfo";
import Header from "../components/userProfile/Header.jsx";
import AccountSettings from "../components/userProfile/AccountSettings.jsx";
import Languages from "../components/userProfile/Languages.jsx";
import Skills from "../components/userProfile/Skills.jsx";
import Interests from "../components/userProfile/Interests.jsx";
import EducationalBackground from "../components/userProfile/EducationalBackground.jsx";
import JobExperience from "../components/userProfile/JobExperience.jsx";
import UniversityActivities from "../components/userProfile/UniversityActivities.jsx";
import Projects from "../components/userProfile/Projects.jsx";
import Certificates from "../components/userProfile/Certificates.jsx";
import Achievements from "../components/userProfile/Achievements.jsx";
import EditModeBar from "../components/userProfile/EditModeBar.jsx";
import { useProfileData } from "../hooks/useProfileData.jsx";
import { usePublicProfile } from "../hooks/usePublicProfile.jsx";
import { useQueryClient } from "react-query";
import api from "../api/axios";
import { toEnglishDigits } from "../components/common/dateUtils";

const SECTION_ENDPOINT = {
  projects: "projects",
  experiences: "experiences",
  education: "educations",
  skills: "skills",
  languages: "languages",
  certificates: "certificates",
  activities: "activities",
  achievements: "achievements",
};

const uid = () => "id-" + Math.random().toString(36).slice(2, 9);
const dateRange = (start, end, ongoing) => {
  if (!start) return "";
  if (ongoing) return `${start} تا اکنون`;
  if (end) return `${start} تا ${end}`;
  return start;
};

export default function Profile({ toastTimer }) {
  const dispatch = useDispatch();
  const { id: routeId } = useParams();
  const viewId = routeId ? String(routeId) : null;
  const isOwner = !viewId;
  const { isLoading: isLoading1 } = useUserInfo(toastTimer, {
    enabled: isOwner,
  });
  const { data: fetchedProfile, isLoading: isLoading2 } = useProfileData(
    toastTimer,
    { enabled: isOwner },
  );
  const { data: publicProfile, isLoading: isLoadingPublic } = usePublicProfile(
    toastTimer,
    viewId,
    { enabled: !isOwner },
  );
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(null);
  const [personalErrors, setPersonalErrors] = useState({});

  const profileData = isOwner ? fetchedProfile : publicProfile;

  const profile = editMode ? (draft ?? profileData) : profileData;
  const setProfile = setDraft;

  const enterEditMode = () => {
    if (!isOwner) return;
    setPersonalErrors({});
    setDraft(profileData);
    setEditMode(true);
  };

  const updatePersonal = useCallback(
    (key, value) =>
      setDraft((prev) => {
        const base = prev ?? profileData;
        if (!base) return prev;
        return {
          ...base,
          personal: { ...base.personal, [key]: value },
        };
      }),
    [profileData],
  );

  const cancelItem = useCallback(() => {
    setEditing(null);
  }, []);

  const saveItem = async (section, id, data) => {
    const endpoint = SECTION_ENDPOINT[section] || section;
    try {
      let response;
      if (id === "new") {
        response = await api.post(`/api/accounts/${endpoint}/`, data);
        const created = response.data;
        setProfile((prev) => {
          const base = prev ?? profileData;
          return {
            ...base,
            [section]: [...(base?.[section] || []), created],
          };
        });
      } else {
        response = await api.patch(`/api/accounts/${endpoint}/${id}/`, data);
        const updated = response.data;
        setProfile((prev) => {
          const base = prev ?? profileData;
          return {
            ...base,
            [section]: (base?.[section] || []).map((it) =>
              String(it.id) === String(id) ? { ...it, ...updated } : it,
            ),
          };
        });
      }
      setEditing(null);
      dispatch(showToast(toastTimer, "با موفقیت ذخیره شد۔"));
    } catch (error) {
      const isNetworkError = !error.response;
      if (isNetworkError) {
        setProfile((prev) => {
          const base = prev ?? profileData;
          const list = base?.[section] || [];
          if (id === "new")
            return { ...base, [section]: [...list, { ...data, id: uid() }] };
          return {
            ...base,
            [section]: list.map((it) =>
              String(it.id) === String(id) ? { ...it, ...data } : it,
            ),
          };
        });
        setEditing(null);
        dispatch(showToast(toastTimer, "با موفقیت ذخیره شد (آفلاین)۔"));
        return;
      }
      const serverMsg =
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data || "").slice(0, 200) ||
        "خطا در ذخیره اطلاعات";
      dispatch(showToast(toastTimer, serverMsg, "error"));
    }
  };

  const removeItem = async (section, id) => {
    if (!window.confirm("آیا از حذف این مورد مطمئن هستید؟")) return;
    const endpoint = SECTION_ENDPOINT[section] || section;
    try {
      await api.delete(`/api/accounts/${endpoint}/${id}/`);
      setProfile((prev) => {
        const base = prev ?? profileData;
        return {
          ...base,
          [section]: (base?.[section] || []).filter(
            (it) => String(it.id) !== String(id),
          ),
        };
      });
      setEditing(null);
      dispatch(showToast(toastTimer, "مورد موردنظر حذف شد۔"));
    } catch (error) {
      const isNetworkError = !error.response;
      if (isNetworkError) {
        setProfile((prev) => {
          const base = prev ?? profileData;
          return {
            ...base,
            [section]: (base?.[section] || []).filter(
              (it) => String(it.id) !== String(id),
            ),
          };
        });
        setEditing(null);
        dispatch(showToast(toastTimer, "مورد موردنظر حذف شد (آفلاین)۔"));
        return;
      }
      dispatch(showToast(toastTimer, "خطا در حذف مورد", "error"));
    }
  };

  const saveProfile = async () => {
    if (editing) {
      dispatch(
        showToast(
          toastTimer,
          "لطفاً ابتدا فرم باز را تکمیل یا لغو کنید۔",
          "error",
        ),
      );
      return;
    }
    const e = {};
    const pr = profile.personal;
    const urlRe = /^https?:\/\/.+\..+/;
    if (!pr.fullName.trim()) e.fullName = "نام و نام خانوادگی الزامی است۔";
    else if (pr.fullName.trim().length < 3) e.fullName = "حداقل ۳ کاراکتر۔";
    else if (pr.fullName.trim().length > 60) e.fullName = "حداکثر ۶۰ کاراکتر۔";
    if (pr.title && pr.title.length > 80) e.title = "حداکثر ۸۰ کاراکتر۔";
    if (pr.university && pr.university.length > 80)
      e.university = "حداکثر ۸۰ کاراکتر۔";
    if (pr.field && pr.field.length > 80) e.field = "حداکثر ۸۰ کاراکتر۔";
    // سال ورود به دانشگاه (جایگزین ترم تحصیلی) — اختیاری، ولی اگر پر شد باید سال شمسی معتبر باشد
    {
      const rawYear = toEnglishDigits(
        String(pr.entryYear ?? "").trim(),
      ).replace(/\D/g, "");
      if (String(pr.entryYear ?? "").trim() && !/^\d{4}$/.test(rawYear)) {
        e.entryYear = "سال ورود باید ۴ رقم باشد (مثلاً ۱۴۰۲)۔";
      } else if (rawYear) {
        const y = Number(rawYear);
        let currentJy = 1405;
        try {
          const fmtJy = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
          });
          const jyParts = fmtJy.formatToParts(new Date());
          const jyVal = Number(
            toEnglishDigits(
              jyParts.find((p) => p.type === "year")?.value || "0",
            ),
          );
          if (jyVal > 1300 && jyVal < 1500) currentJy = jyVal;
        } catch {
          /* fallback 1405 */
        }
        if (y < 1370 || y > 1500)
          e.entryYear = "سال ورود معتبر نیست (مثلاً بین ۱۳۷۰ تا امسال)۔";
        else if (y > currentJy)
          e.entryYear = "سال ورود نمی‌تواند از سال جاری بیشتر باشد۔";
      }
    }
    const normalizeFa = (s) => toEnglishDigits(String(s || "").trim());
    if (
      pr.birthDate &&
      !/^\d{4}\/\d{1,2}(\/\d{1,2})?$/.test(normalizeFa(pr.birthDate))
    )
      e.birthDate = "فرمت تاریخ باید YYYY/MM/DD یا YYYY/MM باشد۔";
    else if (pr.birthDate) {
      try {
        const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        const parts = fmt.formatToParts(new Date());
        const jy = Number(
          toEnglishDigits(parts.find((p) => p.type === "year")?.value || "0"),
        );
        const jm = Number(
          toEnglishDigits(parts.find((p) => p.type === "month")?.value || "0"),
        );
        const jd = Number(
          toEnglishDigits(parts.find((p) => p.type === "day")?.value || "0"),
        );
        const v = normalizeFa(pr.birthDate).split("/");
        const y = Number(v[0]),
          m = Number(v[1] || 1),
          d = Number(v[2] || 1);
        const isFuture =
          y > jy || (y === jy && m > jm) || (y === jy && m === jm && d > jd);
        if (isFuture) e.birthDate = "تاریخ تولد نمی‌تواند بعد از امروز باشد۔";
      } catch (err) {
        void err;
      }
    }
    if (pr.phone) {
      const phoneDigits = normalizeFa(pr.phone).replace(/\D/g, "");
      if (!/^09\d{9}$/.test(phoneDigits))
        e.phone =
          "شماره تماس باید ۱۱ رقم و با 09 شروع شود (مثال: 09123456789)۔";
    }
    if (pr.email && String(pr.email).trim()) {
      const email = String(pr.email).trim();
      if (email.length > 254) e.email = "حداکثر ۲۵۴ کاراکتر۔";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
        e.email = "فرمت ایمیل معتبر نیست (مثال: example@mail.com)۔";
    }
    if (pr.linkedin && pr.linkedin.length > 255)
      e.linkedin = "حداکثر ۲۵۵ کاراکتر۔";
    if (pr.github && pr.github.length > 255) e.github = "حداکثر ۲۵۵ کاراکتر۔";
    if (pr.website && pr.website.length > 255)
      e.website = "حداکثر ۲۵۵ کاراکتر۔";
    else if (pr.website && !urlRe.test(pr.website))
      e.website = "لینک باید با http:// یا https:// شروع شود۔";
    if (pr.about && pr.about.length > 1000) e.about = "حداکثر ۱۰۰۰ کاراکتر۔";
    setPersonalErrors(e);
    if (Object.keys(e).length) {
      dispatch(showToast(toastTimer, "لطفاً خطاهای فرم را برطرف کنید۔", "err"));
      return;
    }
    try {
      const entryYear = toEnglishDigits(
        String(profile.personal.entryYear ?? "").trim(),
      ).replace(/\D/g, "");
      const personalPayload = {
        ...profile.personal,
        entryYear,
      };
      const response = await api.patch("/api/accounts/profile/", {
        personal: personalPayload,
        interests: profile.interests,
      });
      const updated = response.data;
      if (updated) {
        queryClient.setQueryData(["fetch_profile_data"], updated);
      }
      setDraft(null);
      setEditMode(false);
      setEditing(null);
      dispatch(showToast(toastTimer, "تغییرات پروفایل با موفقیت ذخیره شد۔"));
      queryClient.invalidateQueries(["fetch_profile_data"]);
    } catch (error) {
      const isNetworkError = !error.response;
      if (isNetworkError) {
        setDraft(null);
        setEditing(null);
        dispatch(showToast(toastTimer, "تغییرات ذخیره شد (آفلاین)۔"));
        return;
      }
      dispatch(showToast(toastTimer, "خطا در ذخیره پروفایل", "error"));
    }
  };

  const cancelProfile = () => {
    if (editing) {
      dispatch(
        showToast(
          toastTimer,
          "لطفاً ابتدا فرم باز را تکمیل یا لغو کنید۔",
          "error",
        ),
      );
      return;
    }
    setDraft(null);
    setEditMode(false);
    setEditing(null);
    setPersonalErrors({});
    queryClient.invalidateQueries(["fetch_profile_data"]);
  };

  const p = profile?.personal;
  const isFormOpen = (section, id) =>
    !!editing && editing.section === section && editing.id === id;
  const startEdit = (section, id) => setEditing({ section, id });

  const isLoading =
    (isOwner && (isLoading1 || isLoading2)) || (!isOwner && isLoadingPublic);

  if (isLoading) {
    return (
      <div dir="rtl" className="app is-viewing">
        <ProfilePageSkeleton />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div dir="rtl" className="app is-viewing">
        <div className="empty">
          <p>
            {viewId
              ? "کاربری با این شناسه پیدا نشد."
              : "خطا در دریافت اطلاعات پروفایل."}
          </p>
          {viewId ? (
            <Link to="/search" className="btn btn-outline btn-sm">
              بازگشت به جستجو
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className={`app ${editMode ? "is-editing" : "is-viewing"}`}>
      <Header
        p={p}
        editMode={editMode}
        canEdit={isOwner}
        personalErrors={personalErrors}
        updatePersonal={updatePersonal}
        toastTimer={toastTimer}
        profile={profile}
        setPersonalErrors={setPersonalErrors}
        setEditMode={enterEditMode}
      />

      <div className="layout">
        <aside className="col" aria-label="اطلاعات جانبی">
          <Skills
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            toastTimer={toastTimer}
          />
          <Languages
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            toastTimer={toastTimer}
          />
          <Interests
            profile={profile}
            editMode={editMode}
            setProfile={setProfile}
            toastTimer={toastTimer}
          />
          {editMode ? <AccountSettings toastTimer={toastTimer} /> : null}
        </aside>

        <main className="col" aria-label="محتوای اصلی رزومه">
          <JobExperience
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            dateRange={dateRange}
            toastTimer={toastTimer}
          />
          <EducationalBackground
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            dateRange={dateRange}
            toastTimer={toastTimer}
          />
          <UniversityActivities
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            toastTimer={toastTimer}
          />
          <Projects
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            dateRange={dateRange}
            toastTimer={toastTimer}
          />
          <Certificates
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            toastTimer={toastTimer}
          />
          <Achievements
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            cancelItem={cancelItem}
            removeItem={removeItem}
            toastTimer={toastTimer}
          />
        </main>
      </div>

      <EditModeBar
        editMode={editMode}
        saveProfile={saveProfile}
        cancelProfile={cancelProfile}
        editing={editing}
      />
    </div>
  );
}
