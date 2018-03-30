SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tap.com`
--
CREATE DATABASE IF NOT EXISTS `tap` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tap`;

-- --------------------------------------------------------

--
-- Структура таблицы `bad_domains`
--

CREATE TABLE IF NOT EXISTS `bad_domains` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `click`
--

CREATE TABLE IF NOT EXISTS `click` (
  `id` varchar(255) NOT NULL,
  `ua` text NOT NULL,
  `ip` varchar(16) NOT NULL,
  `ref` text NOT NULL,
  `param1` text NOT NULL,
  `param2` text NOT NULL,
  `error` int(11) NOT NULL,
  `bad_domain` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bad_domains`
--
ALTER TABLE `bad_domains`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Индексы таблицы `click`
--
ALTER TABLE `click`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bad_domains`
--
ALTER TABLE `bad_domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
