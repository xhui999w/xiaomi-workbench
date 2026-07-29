"use client";

import { useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  note: string;
  group: "经营核对" | "客户运营" | "门店形象" | "个人成长";
  icon: string;
};

const tasks: Task[] = [
  { id: "settlement", title: "款项日结", note: "核对当日收款与账目", group: "经营核对", icon: "¥" },
  { id: "unicom", title: "联通数据核对", note: "检查业务数据是否一致", group: "经营核对", icon: "数" },
  { id: "moments", title: "朋友圈转发", note: "完成今日内容发布", group: "客户运营", icon: "圈" },
  { id: "wechat", title: "企微加粉和首购并打标签", note: "新增客户及时完成标签", group: "客户运营", icon: "客" },
  { id: "reply", title: "企微回复率", note: "检查并清理未回复消息", group: "客户运营", icon: "答" },
  { id: "photo", title: "高端机返图", note: "按要求完成销售返图", group: "门店形象", icon: "图" },
  { id: "display", title: "陈列检查", note: "检查展台、价签与样机", group: "门店形象", icon: "陈" },
  { id: "reading", title: "学习晨读", note: "完成今日知识学习", group: "个人成长", icon: "读" },
];

const storageKey = (date: string) => `mi-workbench-${date}`;

export default function Home() {
  const [today, setToday] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const date = new Date();
    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    setToday(key);
    try {
      setDone(JSON.parse(localStorage.getItem(storageKey(key)) || "[]"));
    } catch {
      setDone([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && today) localStorage.setItem(storageKey(today), JSON.stringify(done));
  }, [done, ready, today]);

  const groups = useMemo(
    () => ["经营核对", "客户运营", "门店形象", "个人成长"] as const,
    [],
  );
  const progress = Math.round((done.length / tasks.length) * 100);
  const displayDate = today
    ? new Intl.DateTimeFormat("zh-CN", {
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(new Date(`${today}T12:00:00`))
    : "今天";

  const toggle = (id: string) =>
    setDone((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="小米工作台首页">
          <span className="mi-logo">mi</span>
          <span>
            <strong>小米工作台</strong>
            <small>每日门店管理</small>
          </span>
        </a>
        <div className="date-pill"><span>●</span>{displayDate}</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">DAILY ROUTINE</p>
          <h1>{done.length === tasks.length ? "今日任务，全部完成！" : "早上好，开始今天的工作"}</h1>
          <p>专注每一件小事，把门店的每一天都经营好。</p>
        </div>
        <div className="progress-card" aria-label={`今日进度 ${progress}%`}>
          <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{progress}</strong><span>%</span></div>
          </div>
          <div className="progress-copy">
            <span>今日进度</span>
            <strong>{done.length} / {tasks.length} 项已完成</strong>
            <div className="bar"><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="section-title">
          <div>
            <h2>今日待办</h2>
            <p>完成后点击卡片打勾，进度会自动保存</p>
          </div>
          {done.length > 0 && (
            <button className="reset" onClick={() => setDone([])}>重置今日</button>
          )}
        </div>

        <div className="task-groups">
          {groups.map((group) => {
            const list = tasks.filter((task) => task.group === group);
            const completed = list.filter((task) => done.includes(task.id)).length;
            return (
              <section className="group" key={group}>
                <div className="group-heading">
                  <h3>{group}</h3>
                  <span>{completed}/{list.length}</span>
                </div>
                <div className="task-grid">
                  {list.map((task) => {
                    const checked = done.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        className={`task ${checked ? "checked" : ""}`}
                        onClick={() => toggle(task.id)}
                        aria-pressed={checked}
                      >
                        <span className="task-icon">{task.icon}</span>
                        <span className="task-text">
                          <strong>{task.title}</strong>
                          <small>{task.note}</small>
                        </span>
                        <span className="check" aria-hidden="true">{checked ? "✓" : ""}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <footer>每一天，都离目标更近一点 <span>•</span> 小米工作台</footer>
    </main>
  );
}
